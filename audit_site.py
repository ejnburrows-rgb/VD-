import requests

def audit():
    base = "https://viajera-digital-alpha.vercel.app"
    try:
        r = requests.get(base)
        content = r.text
        print(f"Audit for {base}:")
        print(f"Status: {r.status_code}")
        print(f"Memoria found: {'Memoria' in content}")
        print(f"Educación found: {'Educación' in content}")
        print(f"Procesar found: {'Procesar' in content}")
        print(f"Canturia title found: {'Una canturía' in content}")
        print(f"Solicitar CTA found: {'Solicitar' in content}")
        
        poster_url = f"{base}/canturia-demo-poster.jpg"
        rp = requests.head(poster_url)
        print(f"Demo poster ({poster_url}) status: {rp.status_code}")
        
    except Exception as e:
        print(f"Audit failed: {e}")

if __name__ == "__main__":
    audit()
