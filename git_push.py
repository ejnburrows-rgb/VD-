import subprocess

def run(cmd):
    print(f"Running: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(f"STDOUT: {res.stdout}")
    print(f"STDERR: {res.stderr}")
    return res.returncode

run('git add .')
run('git commit -m "Purge legacy processing components and finalize premium UI"')
run('git push origin main')
