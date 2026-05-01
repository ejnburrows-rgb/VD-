import subprocess, json, os, re, sys
import requests
from pathlib import Path

def run_cmd(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip()

def list_deployments():
    out, err = run_cmd('cmd /c npx vercel ls viajera-digital --yes')
    if err:
        print('Error listing deployments:', err, file=sys.stderr)
    lines = out.splitlines()
    # Find lines that look like URLs (start with https://)
    urls = [line.strip() for line in lines if line.strip().startswith('https://')]
    newest = urls[0] if urls else 'N/A'
    # Print first 6 lines as requested (or all if fewer)
    print('--- Recent Vercel deployments (first 6) ---')
    for line in lines[:6]:
        print(line)
    return newest

def portrait_inventory():
    poet_dir = Path('public/poets')
    if not poet_dir.is_dir():
        print('Portrait directory not found.', file=sys.stderr)
        return [], []
    entries = []
    missing = []
    for file in poet_dir.iterdir():
        if file.is_file():
            size_kb = round(file.stat().st_size / 1024, 1)
            entries.append((file.name, size_kb))
            if size_kb < 5:
                missing.append(file.name)
    entries.sort(key=lambda x: x[1])
    total_ok = len([e for e in entries if e[1] >= 5])
    return entries, total_ok, missing

def fetch_page(url):
    try:
        r = requests.get(url, timeout=15)
        return r.text
    except Exception as e:
        print(f'Failed to fetch {url}: {e}', file=sys.stderr)
        return ''

def audit():
    base = 'https://viajera-digital-alpha.vercel.app'
    newest_url = list_deployments()
    print('\n--- Portrait inventory ---')
    entries, total_ok, missing = portrait_inventory()
    for name, kb in entries:
        print(f'{name}: {kb}KB')
    print(f'Total portraits >5KB: {total_ok}')
    if missing:
        print('Missing or <5KB:', ', '.join(missing))
    else:
        print('All portraits meet size requirement.')
    # Fetch pages
    home = fetch_page(base + '/')
    poetas = fetch_page(base + '/poetas')
    educacion = fetch_page(base + '/educacion')
    # STEP 15 checks
    print('\n=== STEP 15 (contact CTA + portrait) ===')
    checks = [
        ('Solicitar present', 'Solicitar'),
        ('Juan Antonio Diaz on button', 'Solicitar a Juan Antonio'),
        ('Un guajiro present', 'Un guajiro'),
        ('guajiro de Hialeah present', 'guajiro de Hialeah'),
        ('PDF o EPUB present', 'PDF o EPUB'),
        ('humo de tabaco present', 'humo de tabaco'),
        ('memorial-portrait-bg class', 'memorial-portrait-bg'),
        ('calixto-gonzalez-hero img', 'calixto-gonzalez-hero'),
    ]
    for label, pattern in checks:
        print(f'{label:30}:', bool(re.search(pattern, home, re.IGNORECASE)))
    # STEP 16 checks
    print('\n=== STEP 16 (poets accordion + educacion) ===')
    checks2 = [
        ('poet-card class', 'poet-card'),
        ('poet-portrait class', 'poet-portrait'),
        ('Vicente Espinel', 'Vicente Espinel'),
        ('Tomasita Quiala', 'Tomasita Quiala'),
        ('Juan Antonio in compendium', 'Juan Antonio'),
        ('educacion-scroll class', 'educacion-scroll'),
        ('viajera peninsular', 'viajera peninsular'),
    ]
    for label, pattern in checks2:
        print(f'{label:30}:', bool(re.search(pattern, poetas, re.IGNORECASE)))
    # Demo poster check
    print('\n=== DEMO POSTER (placeholder ready) ===')
    try:
        r = requests.head(base + '/canturia-demo-poster.jpg', timeout=10)
        print('poster status:'.ljust(30), r.status_code)
    except Exception as e:
        print('poster status: FAIL', e)
    # Report
    print('\n=== REPORT ===')
    print('Newest deployment URL:', newest_url)
    print('Total portraits with >5KB:', total_ok)
    if missing:
        print('Slugs missing or <5KB:', ', '.join(missing))
    else:
        print('Slugs missing or <5KB: None')

if __name__ == '__main__':
    audit()
