from __future__ import annotations

import random
import time
import urllib.request
from pathlib import Path
from urllib.error import HTTPError, URLError

OUT_DIR = Path("public/poets")
OUT_DIR.mkdir(parents=True, exist_ok=True)

CHROME_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

PORTRAITS = {
    "espinel": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Vicente_Espinel.jpg",
        "referer": "https://commons.wikimedia.org/",
    },
    "placido": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/82/Grabiel_Concepci%C3%B3n_Vald%C3%A9s_Pl%C3%A1cido.jpg",
        "referer": "https://commons.wikimedia.org/",
    },
    "tomasita-quiala": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/4/47/Tomasita_Quiala_Asteasun.jpg",
        "referer": "https://commons.wikimedia.org/",
    },
    "juan-antonio-diaz": {
        "url": "https://juanantoniodiaz.com/wp-content/uploads/2024/03/Juan-Antonio-Diaz-poster.jpg",
        "referer": "https://juanantoniodiaz.com/",
    },
    "chanito": {
        "url": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhh9ob5j0_ZH-CFnWhh7gaVtfGShD9mOqBKSt-Cus6FfXTOxs1r-P2YMlRp3f1w7-n1QBdyuJ3TyaOqI4GSuQ3z10HTDoL6cYK50-DvwwhWb1AL-zRk06EGUVfYdGg4R9Fp0aWuwRKF_JM/s1600/Chanito+1.jpg",
        "referer": "https://musicaguajiracubana.blogspot.com/",
    },
    "adolfo-alfonso": {
        "url": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1U39bMPJrXQaE_gA0rN7-uhwL5NAXmqT6Rv26y-_cmP8tRNV5YbHn0yKzcGjiG1_ZW5Y87tRU1vcU70yhl8aQxi6wfHS60ZWXjDuNjuAO7pH7HUuTD2aYEDbaec1TiXH8mMW6bQb2KSA/s1600/Adolfo+centro.jpg",
        "referer": "https://musicaguajiracubana.blogspot.com/",
    },
    "angel-valiente": {
        "url": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiBYTmAnJydBuUmyOFSIXzZvw04ieUqSAFc4Zf8TRXEtKhr9mEZlWDgoYASRR0zRMAgnbXa7wS0Kcc-NKXv0dPbLL8drLt7fa4uxT7FQdBB2PHOEaotRNJJzkA4ZccJavSA8RMSun6o0M4/s1600/Angelito.jpg",
        "referer": "https://musicaguajiracubana.blogspot.com/",
    },
    "riveron-hernandez": {
        "url": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDm_k6Z-Pciw7qEY5eFyvDLkmobOD76r1QDp4ErgyZHPcajqkWgO8pg3FvS3owm9Fl9DbOV_Ni1Pyg53wxr5jY7fdoBK8YwfDDvvecZOkbbQ5LHwuOeRLkGoESQRh5bhJDCNb1nI2MDYA/s1600/FB_IMG_1658581280348.jpg",
        "referer": "https://musicaguajiracubana.blogspot.com/",
    },
    "candelita": {
        "url": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixmwnSaDJuiHYHo8LgKS7Yilc3-_gSjr2T1s8cz0z5iYyk1nCsdzKx5_yDw2mHPl8bVn12vClmcblNnQgiPO0sc43f32T7O1ksp-q3sMQvxQ8-WjVH0D4oLCS1T1gY4WZJ--AvUHAivSA/s1600/Candelita+1976+foto.jpg",
        "referer": "https://musicaguajiracubana.blogspot.com/",
    },
    "cucalambe": {"url": "", "referer": ""},
    "justo-vega": {"url": "", "referer": ""},
    "sosa-curbelo": {"url": "", "referer": ""},
    "efrain-riveron": {"url": "", "referer": ""},
    "soriano": {"url": "", "referer": ""},
    "pablo-leon": {"url": "", "referer": ""},
    "indio-nabori": {"url": "", "referer": ""},
    "mirabal": {"url": "", "referer": ""},
    "chanchito": {"url": "", "referer": ""},
    "quintana": {"url": "", "referer": ""},
    "yoslay": {"url": "", "referer": ""},
    "camargo": {"url": "", "referer": ""},
    "oniesis": {"url": "", "referer": ""},
    "julio-pablo": {"url": "", "referer": ""},
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

def build_request(url: str, referer: str) -> urllib.request.Request:
    headers = {
        "User-Agent": CHROME_UA,
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
        "Accept-Encoding": "identity",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "image",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "cross-site",
    }

    if referer:
        headers["Referer"] = referer

    return urllib.request.Request(url, headers=headers)

def download(slug: str, url: str, referer: str, max_attempts: int = 4) -> tuple[str, str]:
    if not url:
        return slug, "fallback"

    last_error = "unknown"

    for attempt in range(1, max_attempts + 1):
        try:
            request = build_request(url, referer)
            with urllib.request.urlopen(request, timeout=45) as response:
                content_type = response.headers.get("content-type")
                ext = safe_ext(url, content_type)
                data = response.read()

                if len(data) < 2048:
                    last_error = f"too-small-{len(data)}"
                    raise RuntimeError(last_error)

                out_path = OUT_DIR / f"{slug}{ext}"
                out_path.write_bytes(data)
                return slug, f"downloaded-{out_path.name}-{len(data)}"
        except HTTPError as exc:
            last_error = f"http-{exc.code}"
            if exc.code in (429, 503):
                sleep_seconds = (2 ** attempt) + random.uniform(0.4, 1.6)
                time.sleep(sleep_seconds)
                continue
            return slug, f"failed-{last_error}"
        except URLError as exc:
            last_error = f"url-{exc.reason}"
            time.sleep(1.5 + random.uniform(0.2, 0.8))
            continue
        except Exception as exc:
            last_error = f"{type(exc).__name__}-{exc}"
            time.sleep(1.0 + random.uniform(0.2, 0.8))
            continue

    return slug, f"failed-{last_error}"

def main() -> int:
    results: list[tuple[str, str]] = []

    items = list(PORTRAITS.items())
    random.shuffle(items)

    for slug, info in items:
        result = download(slug, info["url"], info["referer"])
        results.append(result)
        print(f"{result[0]}: {result[1]}", flush=True)
        time.sleep(1.2 + random.uniform(0.3, 1.4))

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
