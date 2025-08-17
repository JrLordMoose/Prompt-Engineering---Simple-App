@echo off
echo Creating Desktop Shortcut for Prompt Engineering Simple App...
echo.

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Create a VBS script to create the shortcut
echo Set WshShell = CreateObject("WScript.Shell") > "%TEMP%\create_shortcut.vbs"
echo Set shortcut = WshShell.CreateShortcut("%USERPROFILE%\Desktop\Prompt Engineering Simple App.lnk") >> "%TEMP%\create_shortcut.vbs"
echo shortcut.TargetPath = "cmd.exe" >> "%TEMP%\create_shortcut.vbs"
echo shortcut.Arguments = "/k cd /d ""%CURRENT_DIR%"" ^& npm run electron:dev" >> "%TEMP%\create_shortcut.vbs"
echo shortcut.WorkingDirectory = "%CURRENT_DIR%" >> "%TEMP%\create_shortcut.vbs"
echo shortcut.Description = "Prompt Engineering Simple App - Desktop Application" >> "%TEMP%\create_shortcut.vbs"
echo shortcut.IconLocation = "%CURRENT_DIR%\node_modules\electron\dist\electron.exe,0" >> "%TEMP%\create_shortcut.vbs"
echo shortcut.Save >> "%TEMP%\create_shortcut.vbs"

REM Run the VBS script
cscript //nologo "%TEMP%\create_shortcut.vbs"

REM Clean up
del "%TEMP%\create_shortcut.vbs"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Desktop shortcut created successfully!
    echo 📍 Location: %USERPROFILE%\Desktop\Prompt Engineering Simple App.lnk
    echo.
    echo You can now:
    echo 1. Double-click the shortcut on your desktop
    echo 2. Rename it to anything you want
    echo 3. Move it to any folder
    echo 4. Pin it to your taskbar or start menu
    echo.
) else (
    echo.
    echo ❌ Failed to create shortcut.
    echo.
)

pause
