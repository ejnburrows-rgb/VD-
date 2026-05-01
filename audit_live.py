import urllib.request
url = "https://viajera-digital-alpha.vercel.app"
with urllib.request.urlopen(url) as r:
    html = r.read().decode("utf-8", errors="replace")

checks = [
    ("Memoria",                    True),
    ("Educaci",                    True),
    ("Solicitar a Juan Antonio",   True),
    ("juanantoniodiaz.com",        True),
    ("cta-primary",                True),
    ("contacto",                   True),
    ("Procesar",                   False),
]

all_pass = True
for term, should_exist in checks:
    found = term in html
    status = "[OK]" if found == should_exist else "[FAIL]"
    note = "FOUND" if found else "NOT FOUND"
    if found != should_exist:
        all_pass = False
    print(f"{status} '{term}' — {note} (expected {'FOUND' if should_exist else 'NOT FOUND'})")

print()
print("RESULT:", "ALL CHECKS PASS" if all_pass else "*** FAILURES DETECTED ***")
