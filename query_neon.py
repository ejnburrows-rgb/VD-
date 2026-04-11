import pg8000.native
import json

conn_str = "postgresql://role_27589d67a:kKdXgaHyx6li5L08NU7WhKxeFlqOl8Jb@db-27589d67a.db003.hosteddb.reai.io:5432/27589d67a"

try:
    conn = pg8000.native.Connection(
        user="role_27589d67a",
        password="kKdXgaHyx6li5L08NU7WhKxeFlqOl8Jb",
        host="db-27589d67a.db003.hosteddb.reai.io",
        port=5432,
        database="27589d67a",
        timeout=15
    )
    
    print("Connection successful!")
    
    # Query decimas
    rows = conn.run('SELECT * FROM "Decima" LIMIT 100')
    print("Decimas Found:")
    print(json.dumps(rows, indent=2, default=str))
    
    # Query analyses for context
    rows = conn.run('SELECT * FROM "Analysis" LIMIT 100')
    print("\nAnalyses Found:")
    print(json.dumps(rows, indent=2, default=str))
    
    conn.close()
except Exception as e:
    print(f"Error: {e}")
