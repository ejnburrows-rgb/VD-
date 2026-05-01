from __future__ import annotations

import os
import re
import sys
import time
import urllib.request
from pathlib import Path
from urllib.error import HTTPError, URLError

OUT_DIR = Path("public/poets")
OUT_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": "ViajeraDigitalCanturia/1.0 (+juanantoniodiaz.com)"
}

# Notes:
# - Some historical poets do not have reliable public-domain portraits online.
# - Empty URLs intentionally fall back to PoetPlaceholder in the UI.
# - Do not block build if a portrait fails. The UI must remain premium with fallback cards.
PORTRAITS = {
    "espinel": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Vicente_Espinel.jpg",
    "placido": "https://upload.wikimedia.org/wikipedia/commons/8/82/Grabiel_Concepci%C3%B3n_Vald%C3%A9s_Pl%C3%A1cido.jpg",
    "tomasita-quiala": "https://upload.wikimedia.org/wikipedia/commons/4/47/Tomasita_Quiala_Asteasun.jpg",
    "juan-antonio-diaz": "https://juanantoniodiaz.com/wp-content/uploads/2024/03/Juan-Antonio-Diaz-poster.jpg",

    "chanito": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhh9ob5j0_ZH-CFnWhh7gaVtfGShD9mOqBKSt-Cus6FfXTOxs1r-P2YMlRp3f1w7-n1QBdyuJ3TyaOqI4GSuQ3z10HTDoL6cYK50-DvwwhWb1AL-zRk06EGUVfYdGg4R9Fp0aWuwRKF_JM/s1600/Chanito+1.jpg",
    "adolfo-alfonso": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1U39bMPJrXQaE_gA0rN7-uhwL5NAXmqT6Rv26y-_cmP8tRNV5YbHn0yKzcGjiG1_ZW5Y87tRU1vcU70yhl8aQxi6wfHS60ZWXjDuNjuAO7pH7HUuTD2aYEDbaec1TiXH8mMW6bQb2KSA/s1600/Adolfo+centro.jpg",
    "angel-valiente": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBYTmAnJydBuUmyOFSIXzZvw04ieUqSAFc4Zf8TRXEtKhr9mEZlWDgoYASRR0zRMAgnbXa7wS0Kcc-NKXv0dPbLL8drLt7fa4uxT7FQdBB2PHOEaotRNJJzkA4ZccJavSA8RMSun6o0M4/s1600/Angelito.jpg",
    "riveron-hernandez": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDm_k6Z-Pciw7qEY5eFyvDLkmobOD76r1QDp4ErgyZHPcajqkWgO8pg3FvS3owm9Fl9DbOV_Ni1Pyg53wxr5jY7fdoBK8YwfDDvvecZOkbbQ5LHwuOeRLkGoESQRh5bhJDCNb1nI2MDYA/s1600/FB_IMG_1658581280348.jpg",
    "candelita": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixmwnSaDJuiHYHo8LgKS7Yilc3-_gSjr2T1s8cz0z5iYyk1nCsdzKx5_yDw2mHPl8bVn12vClmcblNnQgiPO0sc43f32T7O1ksp-q3sMQvxQ8-WjVH0D4oLCS1T1gY4WZJ--AvUHAivSA/s1600/Candelita+1976+foto.jpg",

    "cucalambe": "",
    "justo-vega": "",
    "sosa-curbelo": "",
    "efrain-riveron": "",
    "soriano": "",
    "pablo-leon": "",
    "indio-nabori": "",
    "mirabal": "",
    "chanchito": "",
    "quintana": "",
    "yoslay": "",
    "camargo": "",
    "oniesis": "",
    "julio-pablo": "",
}

EXT_BY_CONTENT_TYPE = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

def safe_ext(url: str, content_type: str | None) -> str:
    if content_type:
        ctype = content_type.split(";")[0].strip().lower()
        if ctype in EXT_BY_CONTENT_TYPE:
            return EXT_BY_CONTENT_TYPE[ctype]

    lowered = url.lower().split("?")[0]
    for ext in [".jpg", ".jpeg", ".png", ".webp"]:
        if lowered.endswith(ext):
            return ".jpg" if ext == ".jpeg" else ext
    return ".jpg"

def download(slug: str, url: str) -> tuple[str, str]:
    if not url:
        return slug, "fallback"

    req = urllib.request.Request(url, headers=HEADERS)

    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            content_type = response.headers.get("content-type")
            ext = safe_ext(url, content_type)
            data = response.read()

            if len(data) < 1024:
                return slug, f"failed-small-file-{len(data)}"

            out_path = OUT_DIR / f"{slug}{ext}"
            out_path.write_bytes(data)
            return slug, f"downloaded-{out_path.name}-{len(data)}"
    except HTTPError as exc:
        return slug, f"failed-http-{exc.code}"
    except URLError as exc:
        return slug, f"failed-url-{exc.reason}"
    except Exception as exc:
        return slug, f"failed-{type(exc).__name__}"

def main() -> int:
    results: list[tuple[str, str]] = []

    for slug, url in PORTRAITS.items():
        result = download(slug, url)
        results.append(result)
        print(f"{result[0]}: {result[1]}")
        time.sleep(0.25)

    downloaded = [r for r in results if r[1].startswith("downloaded")]
    fallback = [r for r in results if r[1] == "fallback"]
    failed = [r for r in results if r[1].startswith("failed")]

    print()
    print(f"downloaded={len(downloaded)}")
    print(f"fallback={len(fallback)}")
    print(f"failed={len(failed)}")

    if failed:
        print("failed_slugs=" + ", ".join(slug for slug, _ in failed))

    return 0

if __name__ == "__main__":
    raise SystemExit(main())
