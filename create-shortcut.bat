@echo off
echo Creating Desktop Shortcut for Prompt Engineering Simple App...
echo.

REM Get the current directory (where this script is located)
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Create the shortcut using PowerShell
powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([Environment]::GetFolderPath('Desktop') + '\Prompt Engineering Simple App.lnk'); $Shortcut.TargetPath = 'cmd.exe'; $Shortcut.Arguments = '/k \"cd /d \"%CURRENT_DIR%\" && npm run electron:dev\"'; $Shortcut.WorkingDirectory = '%CURRENT_DIR%'; $Shortcut.Description = 'Prompt Engineering Simple App - Desktop Application'; $Shortcut.IconLocation = '%CURRENT_DIR%\node_modules\electron\dist\electron.exe,0'; $Shortcut.Save()"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Desktop shortcut created successfully!
    echo 📍 Location: %USERPROFILE%\Desktop\Prompt Engineering Simple App.lnk
    echo.
    echo You can now:
    echo 1. Double-click the shortcut on your desktop
    echo 2. Rename it to anything you want
    echo 3. Move it to any folder
    echo.
) else (
    echo.
    echo ❌ Failed to create shortcut. Please run as Administrator.
    echo.
)

pause
