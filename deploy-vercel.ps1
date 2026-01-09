# Script de Deploy Automático a Vercel
# Ejecutar después de vercel login

Write-Host "🚀 Iniciando deploy a Vercel..." -ForegroundColor Green

# Variables de entorno
$GROQ_API_KEY = "your_groq_api_key_here"
$GEMINI_API_KEY = "your_gemini_api_key_here"
$DATABASE_URL = "postgresql://neondb_owner:YOUR_DB_PASSWORD@ep-hidden-haze-adpd59ob-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Obtener URL de producción después del deploy
Write-Host "📦 Desplegando a producción..." -ForegroundColor Yellow
$deployOutput = vercel --prod --yes 2>&1 | Out-String

# Extraer URL de producción
if ($deployOutput -match 'https://[^\s]+\.vercel\.app') {
    $productionUrl = $matches[0]
    Write-Host "✅ Deploy completado!" -ForegroundColor Green
    Write-Host "🌐 URL de producción: $productionUrl" -ForegroundColor Cyan
    
    # Actualizar NEXT_PUBLIC_APP_URL
    $NEXT_PUBLIC_APP_URL = $productionUrl
    
    Write-Host "`n🔧 Configurando variables de entorno..." -ForegroundColor Yellow
    
    # Configurar variables de entorno
    vercel env add GROQ_API_KEY production <<< $GROQ_API_KEY
    vercel env add GEMINI_API_KEY production <<< $GEMINI_API_KEY
    vercel env add DATABASE_URL production <<< $DATABASE_URL
    vercel env add NEXT_PUBLIC_APP_URL production <<< $NEXT_PUBLIC_APP_URL
    
    Write-Host "✅ Variables de entorno configuradas!" -ForegroundColor Green
    Write-Host "`n🎉 Deploy completado exitosamente!" -ForegroundColor Green
    Write-Host "URL: $productionUrl" -ForegroundColor Cyan
} else {
    Write-Host "❌ Error al desplegar. Revisa los logs arriba." -ForegroundColor Red
    Write-Host $deployOutput
}

