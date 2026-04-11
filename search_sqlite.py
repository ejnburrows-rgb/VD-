import sqlite3
import os

db_path = r"C:\Users\enovo\MASTER_DOC_INDEX.db"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # List tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print(f"Tables: {tables}")
    
    # Search for "Coloma" in all columns of all tables
    for table in tables:
        table_name = table[0]
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = [col[1] for col in cursor.fetchall()]
        
        for col in columns:
            query = f"SELECT * FROM {table_name} WHERE {col} LIKE '%Coloma%';"
            try:
                cursor.execute(query)
                results = cursor.fetchall()
                if results:
                    print(f"Match in {table_name}.{col}: {results}")
            except:
                pass
    
    conn.close()
except Exception as e:
    print(f"Error: {e}")
