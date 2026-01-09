# 🔧 CONFIGURACIÓN DE BASE DE DATOS

## ⚠️ Base de datos local detectada

Tu `.env.local` tiene:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/viajera_digital?schema=public
```

## 📋 OPCIONES:

### Opción 1: Base de datos local (PostgreSQL)
Si tienes PostgreSQL instalado localmente:
1. Asegúrate de que PostgreSQL esté corriendo
2. Crea la base de datos: `createdb viajera_digital`
3. Ejecuta: `npx prisma db push`

### Opción 2: Neon (Recomendado - GRATIS)
1. Ve a: https://neon.tech
2. Crea cuenta gratuita
3. Crea nuevo proyecto
4. Copia la connection string (formato: `postgresql://user:pass@host/dbname?sslmode=require`)
5. Reemplaza `DATABASE_URL` en `.env.local`

### Opción 3: Supabase (GRATIS)
1. Ve a: https://supabase.com
2. Crea cuenta gratuita
3. Crea nuevo proyecto
4. Ve a Settings > Database
5. Copia la connection string (formato: `postgresql://postgres:pass@host:5432/postgres`)
6. Reemplaza `DATABASE_URL` en `.env.local`

## ✅ Después de configurar:
```bash
npx prisma db push
npm run dev
```

