import subprocess, json, os, re, sys
import requests
from pathlib import Path

def run_cmd(cmd):
    # Execute a command and return stdout (as string) and stderr
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    return result.stdout or '', result.stderr or ''

def list_deployments():
    out, err = run_cmd('cmd /c npx vercel ls viajera-digital --yes')
    if err:
        print('Error listing deployments:', err, file=sys.stderr)
    lines = out.splitlines()
    # Capture URLs (lines starting with https://)
    urls = [line.strip() for line in lines if line.strip().startswith('https://')]
    newest = urls[0] if urls else 'N/A'
    print('--- Recent Vercel deployments (first 6) ---')
    for line in lines[:6]:
        print(line)
    return newest

def portrait_inventory():
    poet_dir = Path('public/poets')
    entries = []
    missing = []
    if poet_dir.is_dir():
        for file in poet_dir.iterdir():
            if file.is_file():
                size_kb = round(file.stat().st_size / 1024, 1)
                entries.append((file.name, size_kb))
                if size_kb < 5:
                    missing.append(file.name)
    else:
        print('Portrait directory not found.', file=sys.stderr)
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
        ('Solicitar present', r'Solicitar'),
        ('Juan Antonio Diaz on button', r'Solicitar a Juan Antonio'),
        ('Un guajiro present', r'Un guajiro'),
        ('guajiro de Hialeah present', r'guajiro de Hialeah'),
        ('PDF o EPUB present', r'PDF o EPUB'),
        ('humo de tabaco present', r'humo de tabaco'),
        ('memorial-portrait-bg class', r'memorial-portrait-bg'),
        ('calixto-gonzalez-hero img', r'calixto-gonzalez-hero'),
    ]
    for label, pattern in checks:
        print(f'{label:30}:', bool(re.search(pattern, home, re.IGNORECASE)))

    # STEP 16 checks
    print('\n=== STEP 16 (poets accordion + educacion) ===')
    checks2 = [
        ('poet-card class', r'poet-card'),
        ('poet-portrait class', r'poet-portrait'),
        ('Vicente Espinel', r'Vicente Espinel'),
        ('Tomasita Quiala', r'Tomasita Quiala'),
        ('Juan Antonio in compendium', r'Juan Antonio'),
        ('educacion-scroll class', r'educacion-scroll'),
        ('viajera peninsular', r'viajera peninsular'),
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

    # Report summary
    print('\n=== REPORT ===')
    print('Newest deployment URL:', newest_url)
    print('Total portraits with >5KB:', total_ok)
    if missing:
        print('Slugs missing or <5KB:', ', '.join(missing))
    else:
        print('Slugs missing or <5KB: None')

if __name__ == '__main__':
    audit()
