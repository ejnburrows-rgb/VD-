# Script para actualizar DATABASE_URL automáticamente
param(
    [Parameter(Mandatory=$true)]
    [string]$ConnectionString
)

$envFile = ".env.local"
$content = Get-Content $envFile -Raw
$newContent = $content -replace 'DATABASE_URL=.*', "DATABASE_URL=$ConnectionString"
Set-Content -Path $envFile -Value $newContent -NoNewline
Write-Host "✅ DATABASE_URL actualizado en .env.local"
Write-Host "Ejecutando: npx prisma db push"
npx prisma db push

