import subprocess

def run(cmd):
    print(f"Running: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error: {res.stderr}")
    else:
        print(f"Output: {res.stdout}")
    return res.returncode

subprocess.run("del append_css.py", shell=True)
run('git add -A')
run('git commit -m "feat(hero): refined serif title + fleuron + framed portrait + Solicitar CTA"')
run('git push origin main')
