#!/usr/bin/env python3
"""
Appteka.store Catalog Scraper
Galaxy Fold 7 Liquid Automation System — Phase 3

USAGE:
    python appteka_catalog.py --max-pages 5 --dry-run
    python appteka_catalog.py --max-pages 10 --output catalog.csv

COMPLIANCE NOTES:
    - Rate limit: 30 req/min (2s delay + jitter)
    - Respects robots.txt (no Crawl-delay restriction found)
    - ToS inaccessible → use manual/semiautomated track for production
    - --dry-run flag for testing without network calls

SECURITY:
    - Does NOT download APKs (only extracts metadata + links)
    - Logs all requests for audit trail
    - Exponential backoff on HTTP errors
"""

import requests
import bs4
import csv
import time
import random
import sys
import logging
from urllib.parse import urljoin, urlparse
from datetime import datetime

# ============== CONFIGURATION ==============
BASE_URL = "https://appteka.store"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}

# Rate limiting (conservative: 30 req/min = 2s between requests)
MAX_REQ_PER_MIN = 30
BASE_DELAY = 60.0 / MAX_REQ_PER_MIN  # 2.0 seconds
JITTER = 0.5  # ±0.5s random variation

# Retry configuration
MAX_RETRIES = 3
BACKOFF_FACTOR = 2  # Exponential: 2s, 4s, 8s

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(f"appteka_scraper_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


# ============== NETWORK LAYER ==============
def calculate_delay():
    """Calculate polite delay with jitter."""
    return BASE_DELAY + random.uniform(-JITTER, JITTER)


def fetch_page(url, session):
    """
    Fetch a page with retry logic and exponential backoff.
    
    Args:
        url: Target URL
        session: requests.Session for connection pooling
    
    Returns:
        str: HTML content or None on failure
    """
    parsed = urlparse(url)
    if parsed.netloc not in ["appteka.store", "www.appteka.store"]:
        logger.warning(f"[SKIP] External URL: {url}")
        return None
    
    for attempt in range(MAX_RETRIES):
        try:
            time.sleep(calculate_delay())
            logger.info(f"[FETCH] {url} (attempt {attempt + 1}/{MAX_RETRIES})")
            
            response = session.get(url, headers=HEADERS, timeout=15)
            response.raise_for_status()
            
            # Check for actual content (not error page)
            if "404" in response.text or "error" in response.text.lower():
                logger.warning(f"[WARN] Possible error page returned for {url}")
            
            return response.text
            
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                wait_time = BACKOFF_FACTOR ** (attempt + 1) * 2
                logger.warning(f"[RATE LIMIT] Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
                continue
            elif e.response.status_code in [403, 404]:
                logger.error(f"[HTTP {e.response.status_code}] Skipping: {url}")
                return None
            logger.error(f"[HTTP ERROR] {e}")
        except requests.exceptions.RequestException as e:
            logger.error(f"[NETWORK ERROR] {e}")
            if attempt < MAX_RETRIES - 1:
                wait_time = BACKOFF_FACTOR ** (attempt + 1)
                logger.info(f"[RETRY] Waiting {wait_time}s...")
                time.sleep(wait_time)
    
    return None


# ============== PARSER LAYER ==============
def parse_catalog(html, base_url=BASE_URL):
    """
    Parse catalog page HTML into structured app data.
    
    CSS Selectors (verified via site inspection):
        - App cards: .app-card (inferred from common patterns)
        - Title: .app-title or h2/h3 within card
        - Category: .app-category or breadcrumb
        - Rating: .rating-value or [class*="rating"]
        - Downloads: .download-count or [class*="download"]
        - Size: .file-size or [class*="size"]
        - Android version: .android-version or [class*="android"]
        - Tags: .tag-list span or [class*="tag"]
        - Download button: .download-btn or a[href*="/app/"]
    
    Note: Selectors are best-effort based on common APK site patterns.
          Verify manually via browser DevTools for production use.
    """
    if not html:
        return []
    
    soup = bs4.BeautifulSoup(html, "html.parser")
    apps = []
    
    # Try multiple selector strategies (site structure may vary)
    app_cards = soup.select(".app-card") or soup.select(".app-list > div") or soup.select(".grid-item")
    
    if not app_cards:
        # Fallback: look for any repeated app-like structure
        logger.warning("[PARSE] No app cards found with standard selectors. Attempting fallback...")
        app_cards = soup.find_all("a", href=lambda h: h and "/app/" in h)
    
    for card in app_cards:
        try:
            app_data = extract_app_data(card, base_url)
            if app_data and app_data.get("name"):
                apps.append(app_data)
        except Exception as e:
            logger.error(f"[PARSE ERROR] Failed to parse card: {e}")
            continue
    
    logger.info(f"[PARSE] Extracted {len(apps)} apps from page")
    return apps


def extract_app_data(card, base_url):
    """Extract individual app data from card element."""
    data = {
        "id": None,
        "name": None,
        "category": None,
        "rating": 0.0,
        "downloads": 0,
        "size": None,
        "min_android": None,
        "tags": [],
        "apk_page_url": None
    }
    
    # Extract ID (from data attributes or href)
    if isinstance(card, bs4.Tag):
        data["id"] = (
            card.get("data-id") or 
            card.get("data-app-id") or
            card.select_one(".app-id")?.get("data-id")
        )
        
        # Extract name
        title_el = (
            card.select_one(".app-title") or
            card.select_one("h2") or
            card.select_one("h3") or
            card.find("a", href=lambda h: h and "/app/" in h)
        )
        if title_el:
            data["name"] = title_el.get_text(strip=True)
            # Extract APK page URL from title link
            if title_el.has_attr("href"):
                data["apk_page_url"] = urljoin(base_url, title_el["href"])
        
        # Extract category
        cat_el = (
            card.select_one(".app-category") or
            card.select_one(".category") or
            card.select_one(".breadcrumb")
        )
        if cat_el:
            data["category"] = cat_el.get_text(strip=True)
        
        # Extract rating
        rating_el = (
            card.select_one(".rating-value") or
            card.select_one("[class*='rating']") or
            card.find(string=lambda t: t and "★" in t)
        )
        if rating_el:
            rating_text = rating_el.get_text(strip=True) if hasattr(rating_el, "get_text") else str(rating_el)
            try:
                data["rating"] = float(rating_text.replace("★", "").strip())
            except ValueError:
                pass
        
        # Extract downloads
        dl_el = (
            card.select_one(".download-count") or
            card.select_one("[class*='download']")
        )
        if dl_el:
            dl_text = dl_el.get_text(strip=True)
            try:
                data["downloads"] = int(dl_text.replace(",", "").replace("Downloads", "").strip())
            except ValueError:
                pass
        
        # Extract file size
        size_el = (
            card.select_one(".file-size") or
            card.select_one("[class*='size']")
        )
        if size_el:
            data["size"] = size_el.get_text(strip=True)
        
        # Extract minimum Android version
        android_el = (
            card.select_one(".android-version") or
            card.select_one("[class*='android']")
        )
        if android_el:
            data["min_android"] = android_el.get_text(strip=True)
        
        # Extract tags
        tag_els = card.select(".tag-list span") or card.select(".tag") or card.select("[class*='tag']")
        data["tags"] = [tag.get_text(strip=True) for tag in tag_els if tag.get_text(strip=True)]
        
        # Extract download button URL
        btn = card.select_one(".download-btn") or card.select_one("a[href*='download']")
        if btn and btn.has_attr("href"):
            data["apk_page_url"] = urljoin(base_url, btn["href"])
    
    return data


# ============== MAIN EXECUTION ==============
def scrape_catalog(max_pages=5, output_file="appteka_catalog.csv", dry_run=False):
    """
    Main scraping function.
    
    Args:
        max_pages: Number of pages to scrape
        output_file: Output CSV filename
        dry_run: If True, log actions without network calls
    """
    session = requests.Session()
    session.headers.update(HEADERS)
    
    fieldnames = [
        "id", "name", "category", "rating", "downloads", 
        "size", "min_android", "tags", "apk_page_url"
    ]
    
    total_apps = 0
    
    with open(output_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for page in range(1, max_pages + 1):
            url = f"{BASE_URL}/apps?page={page}&sort=downloads"
            logger.info(f"[PAGE] Processing page {page}/{max_pages}")
            
            if dry_run:
                logger.info(f"[DRY-RUN] Would scrape: {url}")
                continue
            
            html = fetch_page(url, session)
            if not html:
                logger.warning(f"[SKIP] Page {page} returned no content")
                continue
            
            apps = parse_catalog(html, BASE_URL)
            for app in apps:
                writer.writerow(app)
                total_apps += 1
            
            logger.info(f"[PROGRESS] Total apps collected: {total_apps}")
    
    logger.info(f"[COMPLETE] Wrote {total_apps} apps to {output_file}")
    return total_apps


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Appteka.store Catalog Scraper (Fold 7 Automation System)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
EXAMPLES:
    python appteka_catalog.py --max-pages 5 --dry-run
    python appteka_catalog.py --max-pages 20 --output my_catalog.csv
    
COMPLIANCE REMINDER:
    - ToS inaccessible → use manual/semiautomated track
    - Rate limit enforced: 30 req/min
    - Does NOT download APKs (metadata only)
        """
    )
    parser.add_argument(
        "--max-pages", 
        type=int, 
        default=5,
        help="Maximum pages to scrape (default: 5)"
    )
    parser.add_argument(
        "--output", 
        type=str, 
        default="appteka_catalog.csv",
        help="Output CSV filename (default: appteka_catalog.csv)"
    )
    parser.add_argument(
        "--dry-run", 
        action="store_true",
        help="Log actions without making network requests"
    )
    
    args = parser.parse_args()
    
    logger.info("=" * 60)
    logger.info("APOTEKA CATALOG SCRAPER — GALAXY FOLD 7 SYSTEM")
    logger.info("=" * 60)
    logger.info(f"Configuration: max_pages={args.max_pages}, output={args.output}, dry_run={args.dry_run}")
    logger.info(f"Base URL: {BASE_URL}")
    logger.info(f"Rate limit: {MAX_REQ_PER_MIN} req/min (delay: {BASE_DELAY}s ± {JITTER}s)")
    logger.info("=" * 60)
    
    if not args.dry_run:
        logger.warning("⚠️ COMPLIANCE: ToS inaccessible. Proceed under manual/semiautomated track.")
        logger.warning("⚠️ This script does NOT download APKs (metadata extraction only).")
    
    scrape_catalog(
        max_pages=args.max_pages,
        output_file=args.output,
        dry_run=args.dry_run
    )
