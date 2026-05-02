import subprocess

def run(cmd):
    print(f"Running: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error: {res.stderr}")
    else:
        print(f"Output: {res.stdout}")
    return res.returncode

run('git add .')
run('git commit -m "Upgrade Canturía premium UI and poets gallery"')
run('git push origin main')
