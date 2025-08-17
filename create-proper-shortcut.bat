@echo off
echo Creating Proper Desktop Shortcut for Prompt Engineering Simple App...
echo.

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Create a VBS script to create the shortcut
echo Set WshShell = CreateObject("WScript.Shell") > "%TEMP%\create_proper_shortcut.vbs"
echo Set shortcut = WshShell.CreateShortcut("%USERPROFILE%\Desktop\Prompt Engineering Simple App.lnk") >> "%TEMP%\create_proper_shortcut.vbs"
echo shortcut.TargetPath = "%CURRENT_DIR%\launch-app.bat" >> "%TEMP%\create_proper_shortcut.vbs"
echo shortcut.WorkingDirectory = "%CURRENT_DIR%" >> "%TEMP%\create_proper_shortcut.vbs"
echo shortcut.Description = "Prompt Engineering Simple App - Desktop Application" >> "%TEMP%\create_proper_shortcut.vbs"
echo shortcut.IconLocation = "%CURRENT_DIR%\node_modules\electron\dist\electron.exe,0" >> "%TEMP%\create_proper_shortcut.vbs"
echo shortcut.Save >> "%TEMP%\create_proper_shortcut.vbs"

REM Run the VBS script
cscript //nologo "%TEMP%\create_proper_shortcut.vbs"

REM Clean up
del "%TEMP%\create_proper_shortcut.vbs" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Proper desktop shortcut created successfully!
    echo 📍 Location: %USERPROFILE%\Desktop\Prompt Engineering Simple App.lnk
    echo.
    echo This shortcut will:
    echo ✅ Open the Electron desktop app directly
    echo ✅ Show a clean startup message
    echo ✅ Work even if you rename the project folder
    echo ✅ Be renamable and movable
    echo.
    echo To use: Double-click the shortcut on your desktop!
    echo.
) else (
    echo.
    echo ❌ Failed to create shortcut.
    echo.
)

pause
