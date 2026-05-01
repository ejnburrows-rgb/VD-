import re

with open('app/globals.css', 'r', encoding='utf-8') as f:
    c = f.read()

# Remove .cta-secondary block
c = re.sub(r'\.cta-secondary\s*\{[^}]*\}\s*', '', c)
# Remove .email-link block
c = re.sub(r'\.email-link\s*\{[^}]*\}\s*', '', c)
# Tighten .cta-attrib margin-top
c = c.replace('margin-top: 2.2rem;', 'margin-top: 1.6rem;')

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(c)

print('Done')
# Verify no remnants
remaining = [line.strip() for line in c.splitlines() if 'cta-secondary' in line or 'email-link' in line]
print('Remaining refs:', remaining if remaining else 'NONE — clean')
