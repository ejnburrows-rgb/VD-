#!/usr/bin/env python3
"""
Appteka.store Ranking + Automation Tagging Engine
Galaxy Fold 7 Liquid Automation System — Phase 4

USAGE:
    python appteka_ranker.py --input appteka_enriched.csv
    python appteka_ranker.py --input appteka_enriched.csv --output ranked_output.csv

OUTPUT:
    - Top 20 apps overall (by automation score)
    - Top 5 per function tag (AUTOMATION_CORE, MEDIA_PIPE, etc.)
    - Full CSV with scores + tags appended

SCORING FORMULA:
    score = w1*log(downloads) + w2*rating*log(rating_count) + w3*category_weight 
            + w4*mod_flag - w5*risk_level

WEIGHT PROFILE (tuned to Fold 7 power user):
    - Media > Productivity > Privacy > AI Integration > System
"""

import csv
import json
import math
import logging
import sys
from datetime import datetime
from collections import defaultdict

# ============== CONFIGURATION ==============
# Weight profile (validated against power user priorities)
WEIGHTS = {
    "w1": 0.35,   # Downloads (log-scaled)
    "w2": 0.25,   # Rating + rating count
    "w3": 0.20,   # Category weight
    "w4": 0.15,   # Mod flag bonus
    "w5": 0.05,   # Risk penalty
    
    # Category weights (sum to 1.0 for interpretability)
    "category_weights": {
        "media": 0.25,
        "video players": 0.25,
        "music": 0.23,
        "productivity": 0.20,
        "tools": 0.18,
        "privacy": 0.18,
        "security": 0.18,
        "ai_integration": 0.15,
        "automation": 0.15,
        "system": 0.12,
        "communication": 0.10,
        "social": 0.10,
        "customization": 0.12,
        "personalization": 0.12,
    }
}

# Function tag keywords (case-insensitive matching)
TAG_KEYWORDS = {
    "AUTOMATION_CORE": [
        "tasker", "macrodroid", "automation", "scheduler", "trigger", 
        "profile", "routine", "flow", "ifttt", "shortcuts"
    ],
    "MEDIA_PIPE": [
        "youtube", "newpipe", "revanced", "downloader", "stream", 
        "video", "music", "audio", "playlist", "torrent", "plex"
    ],
    "PRIVACY_STACK": [
        "vpn", "private", "bouncer", "shelter", "orbot", "tor", 
        "encrypt", "anonymous", "firewall", "netguard", "tracker"
    ],
    "INPUT_SYSTEM": [
        "keyboard", "openboard", "fluoride", "input", "typing", 
        "gesture", "swipe", "clipboard", "clipper"
    ],
    "LAUNCHER_HUB": [
        "nova", "niagara", "launcher", "icon", "home", "desktop",
        "widget", "theme", "personalization"
    ],
    "AI_BRIDGE": [
        "clipper", "ifttt", "webhook", "ai", "llm", "chatgpt", 
        "assistant", "voice", "summarize", "translate"
    ],
    "MOD_STORE": [
        "mod", "premium", "pro", "unlocked", "patched", "cracked",
        "ad-free", "no-root", "xposed"
    ],
    "FILE_MANAGER": [
        "file", "explorer", "manager", "fx", "solid", "total commander",
        "ftp", "smb", "cloud", "sync"
    ],
    "MESSAGING_ENHANCED": [
        "telegram", "whatsapp", "signal", "threema", "messenger",
        "gbwhatsapp", "fmwhatsapp", "plus messenger"
    ],
    "BROWSER_AD_BLOCKED": [
        "browser", "firefox", "chrome", "brave", "duckduckgo",
        "adblock", "ublock", "privacy browser"
    ]
}

# Risk band thresholds
RISK_BANDS = {
    "GREEN": (0.0, 0.3),    # Low risk — safe for daily driver
    "YELLOW": (0.3, 0.6),   # Moderate risk — requires precautions
    "RED": (0.6, 1.0)       # High risk — isolated profile only
}

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(f"appteka_ranker_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


# ============== SCORING ENGINE ==============
def calculate_score(app):
    """
    Calculate automation score for an app.
    
    Args:
        app: dict with keys: downloads, rating, category, mod_type, risk_level, rating_count
    
    Returns:
        float: Score (higher = better for power user automation)
    """
    # Log-scale downloads (handles 0 via log1p)
    downloads = int(app.get("downloads", 0) or 0)
    log_downloads = math.log1p(downloads)
    
    # Rating weighted by rating count (avoids skew from single reviews)
    rating = float(app.get("rating", 0) or 0)
    rating_count = int(app.get("rating_count", 1) or 1)
    rating_weight = rating * math.log1p(rating_count)
    
    # Category weight (fuzzy match)
    category = (app.get("category") or "").lower()
    category_weight = 0.5  # Default mid-weight
    for cat_key, weight in WEIGHTS["category_weights"].items():
        if cat_key in category:
            category_weight = weight
            break
    
    # Mod flag (bonus for power user features)
    mod_type = (app.get("mod_type") or "").upper()
    mod_flag = 1.0 if "MOD" in mod_type or "PREMIUM" in mod_type else 0.0
    
    # Risk level (penalty)
    risk_level = float(app.get("risk_level", 0) or 0)
    
    # Calculate final score
    score = (
        WEIGHTS["w1"] * log_downloads +
        WEIGHTS["w2"] * rating_weight +
        WEIGHTS["w3"] * category_weight +
        WEIGHTS["w4"] * mod_flag -
        WEIGHTS["w5"] * risk_level
    )
    
    return round(score, 4)


def assign_function_tags(app):
    """
    Assign function tags based on name/description keywords.
    
    Args:
        app: dict with keys: name, description, category, tags
    
    Returns:
        list: Function tags (e.g., ["AUTOMATION_CORE", "MEDIA_PIPE"])
    """
    tags = set()
    
    # Build searchable text
    name = (app.get("name") or "").lower()
    description = (app.get("description") or "").lower()
    category = (app.get("category") or "").lower()
    existing_tags = (app.get("tags") or [])
    if isinstance(existing_tags, str):
        try:
            existing_tags = json.loads(existing_tags)
        except json.JSONDecodeError:
            existing_tags = [existing_tags]
    existing_tags_text = " ".join(existing_tags).lower()
    
    searchable = f"{name} {description} {category} {existing_tags_text}"
    
    # Match against tag keywords
    for tag, keywords in TAG_KEYWORDS.items():
        if any(kw in searchable for kw in keywords):
            tags.add(tag)
    
    # Override: high-risk apps get RISK_HIGH tag
    risk_level = float(app.get("risk_level", 0) or 0)
    if risk_level > 0.7:
        tags.add("RISK_HIGH")
    
    return sorted(list(tags))


def get_risk_band(risk_level):
    """
    Determine risk band (GREEN/YELLOW/RED).
    
    Args:
        risk_level: float 0.0-1.0
    
    Returns:
        str: "GREEN", "YELLOW", or "RED"
    """
    for band, (low, high) in RISK_BANDS.items():
        if low <= risk_level <= high:
            return band
    return "RED"  # Default to RED if out of range


# ============== RANKING ENGINE ==============
def rank_apps(input_file, output_file=None):
    """
    Rank apps by automation score and generate outputs.
    
    Args:
        input_file: Path to enriched CSV
        output_file: Path to output CSV (optional)
    
    Returns:
        dict: Rankings (top_20, top_per_tag, full_ranked)
    """
    apps = []
    
    # Load enriched data
    with open(input_file, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            apps.append(row)
    
    logger.info(f"[LOAD] Loaded {len(apps)} apps from {input_file}")
    
    # Calculate scores and tags for all apps
    for app in apps:
        app["automation_score"] = calculate_score(app)
        app["function_tags"] = assign_function_tags(app)
        app["risk_band"] = get_risk_band(float(app.get("risk_level", 0) or 0))
    
    # Sort by score (descending)
    apps_sorted = sorted(apps, key=lambda x: x["automation_score"], reverse=True)
    
    # Extract top 20 overall
    top_20 = apps_sorted[:20]
    
    # Extract top 5 per tag
    tag_groups = defaultdict(list)
    for app in apps_sorted:
        for tag in app["function_tags"]:
            tag_groups[tag].append(app)
    
    top_per_tag = {tag: apps[:5] for tag, apps in tag_groups.items()}
    
    # Log summary
    logger.info(f"[RANK] Top 20 calculated")
    logger.info(f"[RANK] Tags found: {list(tag_groups.keys())}")
    for tag, ranked in top_per_tag.items():
        logger.info(f"[RANK] Top 5 {tag}: {[a['name'] for a in ranked]}")
    
    # Write output CSV if requested
    if output_file:
        fieldnames = list(apps[0].keys())
        with open(output_file, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for app in apps_sorted:
                # Convert list to JSON string for CSV compatibility
                app_copy = app.copy()
                app_copy["function_tags"] = json.dumps(app_copy["function_tags"])
                writer.writerow(app_copy)
        logger.info(f"[WRITE] Wrote {len(apps_sorted)} apps to {output_file}")
    
    return {
        "top_20": top_20,
        "top_per_tag": top_per_tag,
        "full_ranked": apps_sorted
    }


def print_rankings(rankings):
    """Print formatted rankings to console."""
    print("\n" + "=" * 80)
    print("APOTEKA RANKING ENGINE — GALAXY FOLD 7 AUTOMATION SYSTEM")
    print("=" * 80)
    
    # Top 20 overall
    print("\n📊 TOP 20 APPS OVERALL (by Automation Score)")
    print("-" * 80)
    for i, app in enumerate(rankings["top_20"], 1):
        score = app["automation_score"]
        risk = app["risk_band"]
        tags = ", ".join(app["function_tags"][:3])  # Show first 3 tags
        print(f"{i:2}. {app['name']:<40} Score: {score:6.2f} | Risk: {risk:<5} | Tags: {tags}")
    
    # Top per tag
    print("\n🏷️  TOP 5 PER FUNCTION TAG")
    print("-" * 80)
    for tag, apps in rankings["top_per_tag"].items():
        print(f"\n  [{tag}]")
        for i, app in enumerate(apps, 1):
            score = app["automation_score"]
            risk = app["risk_band"]
            print(f"    {i}. {app['name']:<35} Score: {score:6.2f} | Risk: {risk}")
    
    print("\n" + "=" * 80)


# ============== MAIN EXECUTION ==============
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Appteka Ranking + Tagging Engine (Fold 7 Automation System)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
EXAMPLES:
    python appteka_ranker.py --input appteka_enriched.csv
    python appteka_ranker.py --input appteka_enriched.csv --output ranked.csv

SCORING WEIGHTS (tuned to power user):
    - Downloads: 35%% (log-scaled)
    - Rating × count: 25%%
    - Category: 20%%
    - Mod flag: 15%%
    - Risk penalty: 5%%

CATEGORY PRIORITY:
    Media > Productivity > Privacy > AI > System
        """
    )
    parser.add_argument(
        "--input", 
        type=str, 
        default="appteka_enriched.csv",
        help="Input enriched CSV (default: appteka_enriched.csv)"
    )
    parser.add_argument(
        "--output", 
        type=str, 
        default="appteka_ranked.csv",
        help="Output ranked CSV (default: appteka_ranked.csv)"
    )
    parser.add_argument(
        "--quiet", 
        action="store_true",
        help="Suppress console output (log only)"
    )
    
    args = parser.parse_args()
    
    logger.info("=" * 80)
    logger.info("APOTEKA RANKING ENGINE — GALAXY FOLD 7 SYSTEM")
    logger.info("=" * 80)
    logger.info(f"Configuration: input={args.input}, output={args.output}")
    logger.info("=" * 80)
    
    rankings = rank_apps(args.input, args.output)
    
    if not args.quiet:
        print_rankings(rankings)
    
    logger.info("[COMPLETE] Ranking engine finished")
