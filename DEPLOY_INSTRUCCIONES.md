# 🚀 Deploy Automático a Vercel - Instrucciones

## ⚠️ IMPORTANTE: Login Requerido

El login de Vercel requiere autenticación manual. Sigue estos pasos:

### Paso 1: Login Manual (Una vez)

```bash
vercel login
```

Esto abrirá una URL en tu navegador. **Debes autenticarte manualmente**.

### Paso 2: Deploy Automático

Una vez autenticado, ejecuta:

```bash
# Opción 1: Script automático
.\deploy-vercel.ps1

# Opción 2: Comandos manuales
vercel --prod --yes
```

### Paso 3: Configurar Variables de Entorno

Después del deploy, configura las variables:

```bash
# Obtener URL de producción del output anterior
# Luego ejecutar:

vercel env add GROQ_API_KEY production
# Pega: your_groq_api_key_here

vercel env add GEMINI_API_KEY production
# Pega: your_gemini_api_key_here

vercel env add DATABASE_URL production
# Pega: postgresql://neondb_owner:YOUR_DB_PASSWORD@ep-hidden-haze-adpd59ob-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

vercel env add NEXT_PUBLIC_APP_URL production
# Pega: https://tu-proyecto.vercel.app (reemplaza con tu URL real)
```

---

## 🔄 Alternativa: Deploy desde Dashboard Web

Si prefieres usar la interfaz web:

1. **Ve a [vercel.com](https://vercel.com)**
2. **Importa tu repositorio**
3. **En Settings → Environment Variables, agrega:**
   - `GROQ_API_KEY` = `your_groq_api_key_here`
   - `GEMINI_API_KEY` = `your_gemini_api_key_here`
   - `DATABASE_URL` = `postgresql://neondb_owner:YOUR_DB_PASSWORD@ep-hidden-haze-adpd59ob-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - `NEXT_PUBLIC_APP_URL` = `https://tu-proyecto.vercel.app` (después del primer deploy)
4. **Click en "Deploy"**

---

## 📋 Variables de Entorno para Vercel

```
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgresql://neondb_owner:YOUR_DB_PASSWORD@ep-hidden-haze-adpd59ob-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

**Nota**: Actualiza `NEXT_PUBLIC_APP_URL` con la URL real después del primer deploy.

---

## ✅ Checklist

- [ ] `vercel login` completado
- [ ] `vercel --prod` ejecutado
- [ ] Variables de entorno configuradas
- [ ] URL de producción obtenida
- [ ] App accesible en producción

---

**El login de Vercel requiere interacción manual del usuario. Una vez autenticado, el resto puede automatizarse.**

