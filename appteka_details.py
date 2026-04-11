#!/usr/bin/env python3
"""
Appteka.store Detail Enricher
Galaxy Fold 7 Liquid Automation System — Phase 3

USAGE:
    python appteka_details.py --input appteka_catalog.csv --dry-run
    python appteka_details.py --input appteka_catalog.csv --output appteka_enriched.csv

COMPLIANCE NOTES:
    - Rate limit: 30 req/min (2s delay + jitter)
    - Does NOT download APKs (extracts metadata + hash only)
    - ToS inaccessible → use manual/semiautomated track for production
    - --dry-run flag for testing without network calls

SECURITY:
    - Extracts SHA256 hash for VirusTotal verification
    - Does NOT execute or install APKs
    - Logs all requests for audit trail
"""

import requests
import bs4
import csv
import time
import random
import sys
import logging
import json
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
}

# Rate limiting
MAX_REQ_PER_MIN = 30
BASE_DELAY = 60.0 / MAX_REQ_PER_MIN
JITTER = 0.5

# Retry configuration
MAX_RETRIES = 3
BACKOFF_FACTOR = 2

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(f"appteka_enricher_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


# ============== NETWORK LAYER (shared with catalog scraper) ==============
def calculate_delay():
    """Calculate polite delay with jitter."""
    return BASE_DELAY + random.uniform(-JITTER, JITTER)


def fetch_page(url, session):
    """Fetch a page with retry logic and exponential backoff."""
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
def parse_details(html, base_url=BASE_URL):
    """
    Parse app detail page HTML into enriched metadata.
    
    Extracted fields:
        - description: App description text
        - version_history: List of version changelog entries
        - mod_type: "MOD" or "ORIGINAL" based on title indicators
        - hashes: dict with sha256 (for VirusTotal verification)
        - apk_link: Direct APK download URL (if available)
        - rating_count: Number of ratings/reviews
        - updated: Last update date
        - developer: Developer/publisher name
        - permissions: List of Android permissions (if displayed)
    
    CSS Selectors (best-effort, verify via DevTools):
        - Description: .description p
        - Version history: .version-list li or .changelog li
        - Hash: [data-hash-sha256] or .hash-value
        - Download button: .download-btn[href$='.apk']
        - Rating count: .rating-count or [class*='review']
        - Updated: .updated-date or [class*='update']
        - Developer: .developer or .publisher
    """
    if not html:
        return {}
    
    soup = bs4.BeautifulSoup(html, "html.parser")
    
    details = {
        "description": "",
        "version_history": [],
        "mod_type": "ORIGINAL",
        "sha256": None,
        "apk_link": None,
        "rating_count": 0,
        "updated": None,
        "developer": None,
        "permissions": []
    }
    
    # Extract description
    desc_el = soup.select_one(".description p") or soup.select_one(".description")
    if desc_el:
        details["description"] = desc_el.get_text(strip=True)
    
    # Extract version history / changelog
    version_els = soup.select(".version-list li") or soup.select(".changelog li") or soup.select(".version-history li")
    details["version_history"] = [v.get_text(strip=True) for v in version_els if v.get_text(strip=True)]
    
    # Detect mod type from title
    title_el = soup.select_one("h1") or soup.select_one(".app-title")
    if title_el:
        title_text = title_el.get_text().upper()
        if any(indicator in title_text for indicator in ["MOD", "PREMIUM", "PRO", "UNLOCKED", "PATCHED"]):
            details["mod_type"] = "MOD"
    
    # Extract SHA256 hash (critical for security verification)
    hash_el = (
        soup.select_one("[data-hash-sha256]") or
        soup.select_one("[data-sha256]") or
        soup.select_one(".hash-value[data-sha256]")
    )
    if hash_el:
        details["sha256"] = (
            hash_el.get("data-hash-sha256") or 
            hash_el.get("data-sha256") or
            hash_el.get_text(strip=True)
        )
    
    # Extract APK download link
    btn = soup.select_one(".download-btn[href$='.apk']") or soup.select_one("a[href*='/download/']")
    if btn and btn.has_attr("href"):
        details["apk_link"] = urljoin(base_url, btn["href"])
    
    # Extract rating count
    rating_count_el = soup.select_one(".rating-count") or soup.select_one(".review-count")
    if rating_count_el:
        try:
            count_text = rating_count_el.get_text(strip=True).replace(",", "")
            details["rating_count"] = int(''.join(filter(str.isdigit, count_text)))
        except ValueError:
            pass
    
    # Extract last update date
    updated_el = soup.select_one(".updated-date") or soup.select_one(".last-updated") or soup.select_one(".date")
    if updated_el:
        details["updated"] = updated_el.get_text(strip=True)
    
    # Extract developer/publisher
    dev_el = soup.select_one(".developer") or soup.select_one(".publisher") or soup.select_one(".author")
    if dev_el:
        details["developer"] = dev_el.get_text(strip=True)
    
    # Extract permissions (if displayed)
    perm_els = soup.select(".permissions li") or soup.select(".app-permissions li")
    details["permissions"] = [p.get_text(strip=True) for p in perm_els if p.get_text(strip=True)]
    
    return details


def calculate_risk_level(app_data):
    """
    Calculate risk level (0.0-1.0) based on app characteristics.
    
    Risk factors:
        - MOD type: +0.3
        - High-risk permissions (SMS, CALL, ADMIN): +0.2 each
        - No hash provided: +0.2
        - Unknown developer: +0.1
        - Low rating (<3.5): +0.1
    
    Returns: float 0.0 (low risk) to 1.0 (high risk)
    """
    risk = 0.0
    
    # MOD flag
    if app_data.get("mod_type") == "MOD":
        risk += 0.3
    
    # Missing hash
    if not app_data.get("sha256"):
        risk += 0.2
    
    # Unknown developer
    if not app_data.get("developer"):
        risk += 0.1
    
    # Low rating
    rating = app_data.get("rating", 5.0)
    if rating < 3.5:
        risk += 0.1
    elif rating < 4.0:
        risk += 0.05
    
    # High-risk permissions
    high_risk_perms = ["SEND_SMS", "RECEIVE_SMS", "READ_CONTACTS", "WRITE_CONTACTS", 
                       "DEVICE_ADMIN", "BIND_ACCESSIBILITY_SERVICE", "SYSTEM_ALERT_WINDOW"]
    permissions = app_data.get("permissions", [])
    for perm in permissions:
        if any(hr in perm.upper() for hr in high_risk_perms):
            risk += 0.2
    
    return min(risk, 1.0)  # Cap at 1.0


# ============== MAIN EXECUTION ==============
def enrich_catalog(input_file, output_file, dry_run=False):
    """
    Enrich catalog CSV with detail page data.
    
    Args:
        input_file: Path to input catalog CSV
        output_file: Path to output enriched CSV
        dry_run: If True, log actions without network calls
    """
    session = requests.Session()
    session.headers.update(HEADERS)
    
    fieldnames = [
        "id", "name", "category", "rating", "downloads", 
        "size", "min_android", "tags", "apk_page_url",
        "description", "version_history", "mod_type", "sha256",
        "apk_link", "rating_count", "updated", "developer", 
        "permissions", "risk_level"
    ]
    
    total_processed = 0
    total_enriched = 0
    
    with open(input_file, newline="", encoding="utf-8") as infile, \
         open(output_file, "w", newline="", encoding="utf-8") as outfile:
        
        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            total_processed += 1
            logger.info(f"[PROCESS] {total_processed}: {row.get('name', 'Unknown')}")
            
            if dry_run:
                logger.info(f"[DRY-RUN] Would enrich: {row.get('name')}")
                writer.writerow(row)
                continue
            
            # Enrich from detail page
            if row.get("apk_page_url"):
                html = fetch_page(row["apk_page_url"], session)
                if html:
                    details = parse_details(html, BASE_URL)
                    row["description"] = details.get("description", "")
                    row["version_history"] = json.dumps(details.get("version_history", []))
                    row["mod_type"] = details.get("mod_type", "ORIGINAL")
                    row["sha256"] = details.get("sha256", "")
                    row["apk_link"] = details.get("apk_link", "")
                    row["rating_count"] = details.get("rating_count", 0)
                    row["updated"] = details.get("updated", "")
                    row["developer"] = details.get("developer", "")
                    row["permissions"] = json.dumps(details.get("permissions", []))
                    
                    # Calculate risk level
                    row["risk_level"] = round(calculate_risk_level(row), 2)
                    total_enriched += 1
                else:
                    logger.warning(f"[SKIP] No content for {row.get('name')}")
            else:
                logger.warning(f"[SKIP] No APK page URL for {row.get('name')}")
            
            writer.writerow(row)
    
    logger.info(f"[COMPLETE] Processed {total_processed} apps, enriched {total_enriched}")
    return total_enriched


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Appteka.store Detail Enricher (Fold 7 Automation System)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
EXAMPLES:
    python appteka_details.py --input appteka_catalog.csv --dry-run
    python appteka_details.py --input appteka_catalog.csv --output enriched.csv

SECURITY WORKFLOW:
    1. Run this script to extract SHA256 hashes
    2. Verify hashes on VirusTotal (virustotal.com)
    3. Only proceed with apps that have 60+/70 clean engines
    4. Install in isolated Android profile/emulator first

COMPLIANCE REMINDER:
    - ToS inaccessible → use manual/semiautomated track
    - Does NOT download APKs (metadata extraction only)
        """
    )
    parser.add_argument(
        "--input", 
        type=str, 
        default="appteka_catalog.csv",
        help="Input catalog CSV (default: appteka_catalog.csv)"
    )
    parser.add_argument(
        "--output", 
        type=str, 
        default="appteka_enriched.csv",
        help="Output enriched CSV (default: appteka_enriched.csv)"
    )
    parser.add_argument(
        "--dry-run", 
        action="store_true",
        help="Log actions without making network requests"
    )
    
    args = parser.parse_args()
    
    logger.info("=" * 60)
    logger.info("APOTEKA DETAIL ENRICHER — GALAXY FOLD 7 SYSTEM")
    logger.info("=" * 60)
    logger.info(f"Configuration: input={args.input}, output={args.output}, dry_run={args.dry_run}")
    logger.info(f"Base URL: {BASE_URL}")
    logger.info(f"Rate limit: {MAX_REQ_PER_MIN} req/min (delay: {BASE_DELAY}s ± {JITTER}s)")
    logger.info("=" * 60)
    
    if not args.dry_run:
        logger.warning("⚠️ COMPLIANCE: ToS inaccessible. Proceed under manual/semiautomated track.")
        logger.warning("⚠️ SECURITY: Verify all SHA256 hashes on VirusTotal before install.")
    
    enrich_catalog(
        input_file=args.input,
        output_file=args.output,
        dry_run=args.dry_run
    )
