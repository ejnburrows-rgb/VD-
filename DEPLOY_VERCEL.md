# 🚀 Deploy en Vercel - Instrucciones Completas

## ✅ Pre-requisitos Completados

- ✅ `npm install` ejecutado
- ✅ Dependencias instaladas
- ✅ `npm run dev` corriendo
- ✅ Servidor local funcionando

---

## 📋 Opción 1: Deploy Automático (Recomendado)

### Paso 1: Conectar Repositorio

1. **Ve a [vercel.com](https://vercel.com)**
2. **Inicia sesión** o crea una cuenta
3. **Click en "Add New..." → "Project"**
4. **Importa tu repositorio** de GitHub/GitLab/Bitbucket
5. **Vercel detectará Next.js automáticamente**

### Paso 2: Configurar Variables de Entorno

En el dashboard de Vercel, después de importar el proyecto:

1. **Ve a Settings → Environment Variables**
2. **Agrega las siguientes variables:**

```
GROQ_API_KEY = your_groq_api_key_here
GEMINI_API_KEY = your_gemini_api_key_here
DATABASE_URL = postgresql://neondb_owner:YOUR_DB_PASSWORD@ep-hidden-haze-adpd59ob-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NEXT_PUBLIC_APP_URL = https://tu-proyecto.vercel.app
```

3. **Selecciona los ambientes:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Paso 3: Deploy

1. **Click en "Deploy"**
2. **Espera a que termine el build** (2-5 minutos)
3. **Tu app estará disponible en:** `https://tu-proyecto.vercel.app`

---

## 📋 Opción 2: Deploy Manual con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Login

```bash
vercel login
```

### Paso 3: Deploy

```bash
# Deploy a preview
vercel

# Deploy a producción
vercel --prod
```

### Paso 4: Configurar Variables de Entorno

```bash
# Agregar variables de entorno
vercel env add GROQ_API_KEY
vercel env add GEMINI_API_KEY
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_APP_URL

# O usar el dashboard web (más fácil)
```

---

## ⚙️ Configuración de Vercel

### Build Settings (Automático)

Vercel detectará automáticamente:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Configuración Manual (si es necesario)

Si necesitas configurar manualmente, usa `vercel.json` (ya creado):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

## 🔧 Variables de Entorno en Vercel

### Production
```
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=postgresql://neondb_owner:YOUR_DB_PASSWORD@ep-hidden-haze-adpd59ob-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

### Preview/Development
Usa las mismas variables o diferentes según necesites.

---

## 🐛 Troubleshooting

### Error: "Build failed"
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Vercel
- Asegúrate de que `prisma generate` se ejecute (ya está en `postinstall`)

### Error: "Environment variables not found"
- Verifica que todas las variables estén configuradas en Vercel
- Asegúrate de seleccionar los ambientes correctos (Production, Preview, Development)

### Error: "Database connection failed"
- Verifica que `DATABASE_URL` esté correcto
- Asegúrate de que Neon permita conexiones desde Vercel (debería funcionar por defecto)

### Error: "API key invalid"
- Verifica que las API keys estén correctas
- Asegúrate de que no haya espacios extra

---

## 📊 Monitoreo Post-Deploy

### Verificar que todo funciona:

1. **Abre tu URL de Vercel**
2. **Verifica que la página carga**
3. **Prueba el procesador de décimas:**
   - Ingresa una URL de YouTube
   - Ingresa nombre del cantante
   - Click en "Transcribir Video"
   - Verifica que el proceso funcione

### Logs en Vercel:

- **Ve a tu proyecto en Vercel**
- **Click en "Deployments"**
- **Click en el deployment más reciente**
- **Ve a "Functions" para ver logs de API routes**

---

## ✅ Checklist de Deploy

- [x] Repositorio conectado a Vercel
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] App accesible en URL de Vercel
- [ ] Procesador de décimas funcionando
- [ ] APIs respondiendo correctamente

---

## 🎉 ¡Deploy Completado!

Una vez que el deploy esté completo, tu app estará disponible en:
**https://tu-proyecto.vercel.app**

---

**Nota**: Recuerda actualizar `NEXT_PUBLIC_APP_URL` en Vercel con la URL real de tu proyecto después del primer deploy.

