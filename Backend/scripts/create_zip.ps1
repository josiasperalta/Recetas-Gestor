# PowerShell script para crear un archivo ZIP con los scripts de MongoDB

$scriptPath = $PSScriptRoot
$zipPath = Join-Path $scriptPath "mongodb_scripts.zip"

# Eliminar el archivo ZIP si ya existe
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Crear un nuevo archivo ZIP usando Compress-Archive
$filesToZip = @("usuarios.js", "recetas.js", "comentarios.js", "README.md")
Compress-Archive -Path $filesToZip -DestinationPath $zipPath

Write-Host "Archivo ZIP creado en: $zipPath"
