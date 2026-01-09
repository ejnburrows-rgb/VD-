# 🚀 DEPLOY A NETLIFY - EL GUAJIRO DE HIALEAH

## ✅ Estado Actual
- ✅ Build local exitoso (sin errores)
- ✅ Código pusheado a GitHub: https://github.com/ejnburrows-rgb/VD-.git
- ✅ netlify.toml configurado
- ✅ Secrets removidos de documentación

---

## 📋 PASOS PARA DEPLOY EN NETLIFY

### Paso 1: Ir a Netlify (30 segundos)
1. Abre: **https://app.netlify.com**
2. Inicia sesión con GitHub

### Paso 2: Importar Proyecto (1 minuto)
1. Click en **"Add new site"** → **"Import an existing project"**
2. Selecciona **GitHub**
3. Autoriza Netlify si te lo pide
4. Busca y selecciona: **VD-** (o el nombre de tu repo)

### Paso 3: Configuración de Build (1 minuto)
Netlify detectará automáticamente Next.js, pero verifica:

| Campo | Valor |
|-------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | *(dejar vacío)* |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |

### Paso 4: Variables de Entorno (2 minutos)
Click en **"Show advanced"** → **"New variable"** y agrega:

| Variable | Valor |
|----------|-------|
| `GROQ_API_KEY` | Tu API key de Groq (ver `.env.local`) |
| `GEMINI_API_KEY` | Tu API key de Gemini (ver `.env.local`) |
| `DATABASE_URL` | Tu connection string de Neon (ver `.env.local`) |
| `NEXT_PUBLIC_APP_URL` | `https://TU-SITIO.netlify.app` |

⚠️ **IMPORTANTE**: Actualiza `NEXT_PUBLIC_APP_URL` después del primer deploy con tu URL real.

### Paso 5: Deploy (click único)
1. Click en **"Deploy site"**
2. Espera 2-5 minutos mientras Netlify:
   - Clona el repo
   - Instala dependencias
   - Ejecuta `npm run build`
   - Publica el sitio

### Paso 6: Obtener URL
Una vez completado, verás tu URL:
```
https://nombre-aleatorio.netlify.app
```

---

## 🔧 CONFIGURACIÓN POST-DEPLOY

### Cambiar Nombre del Sitio (opcional)
1. Ve a **Site settings** → **Domain management** → **Domains**
2. Click en **"Options"** junto al nombre aleatorio
3. Click en **"Edit site name"**
4. Escribe: `el-guajiro-de-hialeah`
5. Tu nueva URL: `https://el-guajiro-de-hialeah.netlify.app`

### Actualizar NEXT_PUBLIC_APP_URL
1. Ve a **Site settings** → **Environment variables**
2. Edita `NEXT_PUBLIC_APP_URL` con tu URL final
3. Redeploy: **Deploys** → **Trigger deploy** → **Deploy site**

---

## ⚠️ NOTA IMPORTANTE: Imagen Hero

La imagen hero (`public/calixto-gonzalez-hero.jpg`) no está en el repo.

**Opciones:**
1. Agregar la imagen manualmente al repo
2. El hero section funcionará pero mostrará error de imagen
3. Puedes usar una imagen de placeholder temporalmente

---

## 📱 Verificar Deploy

Una vez publicado, verifica:
- [ ] La página carga correctamente
- [ ] El modal "Acerca de" abre
- [ ] La sección de Leonor Lopetegui se expande con el botón *
- [ ] Las pestañas de navegación funcionan
- [ ] La sección de educación muestra los poetas

---

## 🆘 Troubleshooting

### Error: "Build failed"
- Verifica las variables de entorno
- Revisa los logs de build en Netlify

### Error: "Function timeout"
- Las funciones de Netlify tienen límite de 10s (free)
- Considera Netlify Pro para funciones más largas

### Error: "Database connection"
- Verifica DATABASE_URL
- Asegúrate de que Neon esté activo

---

## 🎉 ¡Listo!

Tu aplicación **El Guajiro de Hialeah** estará disponible en:
```
https://el-guajiro-de-hialeah.netlify.app
```
(o el nombre que elijas)

---

**Desarrollado por Emilio José Novo**
