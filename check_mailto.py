import urllib.request
html = urllib.request.urlopen("https://viajera-digital-alpha.vercel.app").read().decode()
print("mailto:    ", "FOUND" if "mailto" in html else "CLEAN")
print("TODO_FILL: ", "FOUND" if "TODO_FILL" in html else "CLEAN")
