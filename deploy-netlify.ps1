# Deploy Script for Netlify
# This script helps prepare the project for Netlify deployment

Write-Host "🚀 Preparando deployment a Netlify..." -ForegroundColor Cyan
Write-Host ""

# Check if Netlify CLI is installed
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyInstalled) {
    Write-Host "⚠️  Netlify CLI no está instalado." -ForegroundColor Yellow
    Write-Host "📦 Instalando Netlify CLI..." -ForegroundColor Cyan
    npm install -g netlify-cli
    Write-Host "✅ Netlify CLI instalado" -ForegroundColor Green
    Write-Host ""
}

# Check if user is logged in
Write-Host "🔐 Verificando autenticación..." -ForegroundColor Cyan
netlify status

Write-Host ""
Write-Host "📋 Opciones de deployment:" -ForegroundColor Cyan
Write-Host "1. Login a Netlify (si no estás autenticado)"
Write-Host "2. Deploy a producción"
Write-Host "3. Abrir dashboard de Netlify"
Write-Host ""

$choice = Read-Host "Selecciona una opción (1-3)"

switch ($choice) {
    "1" {
        Write-Host "🔐 Iniciando login..." -ForegroundColor Cyan
        netlify login
    }
    "2" {
        Write-Host "🚀 Iniciando deploy a producción..." -ForegroundColor Cyan
        Write-Host "⚠️  Asegúrate de haber configurado las variables de entorno en el dashboard de Netlify" -ForegroundColor Yellow
        Write-Host ""
        netlify deploy --prod
    }
    "3" {
        Write-Host "🌐 Abriendo dashboard de Netlify..." -ForegroundColor Cyan
        Start-Process "https://app.netlify.com"
    }
    default {
        Write-Host "❌ Opción inválida" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Listo!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Recordatorio: Configura estas variables de entorno en Netlify Dashboard:" -ForegroundColor Yellow
Write-Host "   - GROQ_API_KEY"
Write-Host "   - GEMINI_API_KEY"
Write-Host "   - DATABASE_URL"
Write-Host "   - NEXT_PUBLIC_APP_URL"
Write-Host ""
