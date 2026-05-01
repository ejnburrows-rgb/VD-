import os
import re

patterns = {
    r'Cantoría': 'Canturía',
    r'Cantoria': 'Canturía',
    r'can-to-ria': 'canturía',
    r'can to ria': 'canturía',
    r'Solicitar a Juan Antonio Díaz': 'Solicitar',
    r'solicitar a Juan Antonio Díaz': 'solicitar',
    r'un guajiro de Hialeah': 'guajiro de Hialeah',
    r'Se imprime sobre papel envejecido por humo de tabaco': 'Se entrega como PDF o EPUB elegante, listo para leer en cualquier dispositivo o imprimir si así lo prefiere.',
    r'piel de gallina': 'emoción profunda', # Fallback for forbidden string
    r'PIEL de gallina': 'EMOCIÓN profunda'
}

def replace_in_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for pattern, replacement in patterns.items():
            content = re.sub(pattern, replacement, content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def walk_and_replace():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            if file.endswith(('.tsx', '.ts', '.js', '.css', '.md', '.json')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    walk_and_replace()
