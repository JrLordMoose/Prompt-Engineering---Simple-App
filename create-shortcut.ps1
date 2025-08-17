Write-Host "Creating Desktop Shortcut for Prompt Engineering Simple App..." -ForegroundColor Green
Write-Host ""

# Get the current directory (where this script is located)
$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Create the shortcut
try {
    $WshShell = New-Object -comObject WScript.Shell
    $DesktopPath = [Environment]::GetFolderPath('Desktop')
    $ShortcutPath = Join-Path $DesktopPath "Prompt Engineering Simple App.lnk"
    
    $Shortcut = $WshShell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = "cmd.exe"
    $Shortcut.Arguments = "/k `"cd /d `"$CurrentDir`" && npm run electron:dev`""
    $Shortcut.WorkingDirectory = $CurrentDir
    $Shortcut.Description = "Prompt Engineering Simple App - Desktop Application"
    
    # Try to set the Electron icon
    $ElectronIcon = Join-Path $CurrentDir "node_modules\electron\dist\electron.exe"
    if (Test-Path $ElectronIcon) {
        $Shortcut.IconLocation = "$ElectronIcon,0"
    }
    
    $Shortcut.Save()
    
    Write-Host "✅ Desktop shortcut created successfully!" -ForegroundColor Green
    Write-Host "📍 Location: $ShortcutPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now:" -ForegroundColor Yellow
    Write-Host "1. Double-click the shortcut on your desktop" -ForegroundColor White
    Write-Host "2. Rename it to anything you want" -ForegroundColor White
    Write-Host "3. Move it to any folder" -ForegroundColor White
    Write-Host "4. Pin it to your taskbar or start menu" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "❌ Failed to create shortcut: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Try running PowerShell as Administrator." -ForegroundColor Yellow
}

Read-Host "Press Enter to continue"
