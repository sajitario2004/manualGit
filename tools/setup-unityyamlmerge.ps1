<#
.SYNOPSIS
  Autoconfigurador de UnityYAMLMerge para Microsoft Windows en PowerShell.
  Detecta la versión instalada de Unity Editor en Unity Hub y configura Git.
#>

$ErrorActionPreference = "Stop"

Write-Host "🔍 Buscando instalación de Unity Editor en Windows..." -ForegroundColor Cyan

$SearchPath = "C:\Program Files\Unity\Hub\Editor\*\Editor\Data\Tools\UnityYAMLMerge.exe"
$Found = Get-ChildItem -Path $SearchPath -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $Found) {
    Write-Host "❌ No se encontro UnityYAMLMerge.exe en C:\Program Files\Unity\Hub\Editor\" -ForegroundColor Red
    Write-Host "   Asegurate de tener instalado Unity Editor mediante Unity Hub." -ForegroundColor Yellow
    exit 1
}

$ToolPath = $Found.FullName
Write-Host "✓ Herramienta encontrada: $ToolPath" -ForegroundColor Green
Write-Host "⚙️ Configurando driver de fusion en Git..." -ForegroundColor Cyan

git config --global merge.unityyamlmerge.name "Unity Smart Merge"
git config --global merge.unityyamlmerge.driver "`"$ToolPath`" merge -h -p -- `"%O`" `"%B`" `"%A`" `"%A`""
git config --global merge.unityyamlmerge.trustExitCode true
git config --global merge.unityyamlmerge.recursive binary

Write-Host "`n🎉 ¡Configuracion completada con exito!" -ForegroundColor Green
Write-Host "   UnityYAMLMerge ahora resolvera automaticamente conflictos en escenas y prefabs." -ForegroundColor Gray
