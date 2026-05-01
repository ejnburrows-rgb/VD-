import urllib.request, os, ssl
ssl._create_default_https_context = ssl._create_unverified_context

PORTRAITS = {
  "espinel":     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Vicente_Espinel.jpg/600px-Vicente_Espinel.jpg",
  "placido":     "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Gabriel_de_la_Concepci%C3%B3n_Vald%C3%A9s.jpg/600px-Gabriel_de_la_Concepci%C3%B3n_Vald%C3%A9s.jpg",
  "cucalambe":   "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Juan_Crist%C3%B3bal_N%C3%A1poles_Fajardo.jpg/600px-Juan_Crist%C3%B3bal_N%C3%A1poles_Fajardo.jpg",
  "chanito":     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Chanito_Isidr%C3%B3n.jpg/600px-Chanito_Isidr%C3%B3n.jpg",
  "justo-vega":  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Justo_Vega.jpg/600px-Justo_Vega.jpg",
  "adolfo-alfonso": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Adolfo_Alfonso.jpg/600px-Adolfo_Alfonso.jpg",
  "tomasita-quiala": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Tomasita_Quiala_Asteasun.jpg/600px-Tomasita_Quiala_Asteasun.jpg",
  "indio-nabori":   "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Indio_Nabor%C3%AD.jpg/600px-Indio_Nabor%C3%AD.jpg",
  "juan-antonio-diaz": "https://juanantoniodiaz.com/wp-content/uploads/2024/09/Juan-Antonio-Diaz-poster.jpg",
}

os.makedirs("public/poets", exist_ok=True)
for slug, url in PORTRAITS.items():
    out = f"public/poets/{slug}.jpg"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r, open(out, "wb") as f:
            f.write(r.read())
        print(f"OK   {slug}")
    except Exception as e:
        print(f"FAIL {slug}: {e}")
