# ⚡ SETUP NEON - 30 SEGUNDOS

## PASOS RÁPIDOS:

1. **Abre**: https://neon.tech (ya abierto en navegador)
2. **Click**: "Sign Up" o "Get Started" (arriba derecha)
3. **Regístrate**: Con GitHub/Google (más rápido) o email
4. **Crea Proyecto**: 
   - Click "Create Project"
   - Nombre: `viajera-digital`
   - Región: Cualquiera (US East más rápido)
   - Click "Create Project"
5. **Copia Connection String**:
   - En el dashboard, busca "Connection string"
   - Click en "Copy" (formato: `postgresql://user:pass@host/dbname?sslmode=require`)
6. **Pega aquí**: Cuando tengas el string, ejecuta:
   ```powershell
   # Reemplaza TU_CONNECTION_STRING con el string que copiaste
   (Get-Content .env.local) -replace 'DATABASE_URL=.*', 'DATABASE_URL=TU_CONNECTION_STRING' | Set-Content .env.local
   ```

**O simplemente copia el string y dímelo, yo lo actualizo automáticamente.**

---

## ALTERNATIVA: SUPABASE (si prefieres)

1. **Abre**: https://supabase.com
2. **Sign Up** con GitHub
3. **New Project** → Nombre: `viajera-digital`
4. **Settings** → **Database** → **Connection string** (URI)
5. Copia y pégamelo

---

**Cuando tengas el connection string, dímelo y continúo automáticamente.**

