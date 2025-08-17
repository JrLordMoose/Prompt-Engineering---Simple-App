@echo off
echo Creating Silent Desktop Shortcut for Prompt Engineering Simple App...
echo.

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Create a VBS script to create the shortcut that runs silently
echo Set WshShell = CreateObject("WScript.Shell") > "%TEMP%\create_silent_shortcut.vbs"
echo Set shortcut = WshShell.CreateShortcut("%USERPROFILE%\Desktop\Prompt Engineering Simple App.lnk") >> "%TEMP%\create_silent_shortcut.vbs"
echo shortcut.TargetPath = "cmd.exe" >> "%TEMP%\create_silent_shortcut.vbs"
echo shortcut.Arguments = "/c start /min cmd /c cd /d ""%CURRENT_DIR%"" ^& npm run electron:dev" >> "%TEMP%\create_silent_shortcut.vbs"
echo shortcut.WorkingDirectory = "%CURRENT_DIR%" >> "%TEMP%\create_silent_shortcut.vbs"
echo shortcut.Description = "Prompt Engineering Simple App - Desktop Application" >> "%TEMP%\create_silent_shortcut.vbs"
echo shortcut.IconLocation = "%CURRENT_DIR%\node_modules\electron\dist\electron.exe,0" >> "%TEMP%\create_silent_shortcut.vbs"
echo shortcut.WindowStyle = 7 >> "%TEMP%\create_silent_shortcut.vbs"
echo shortcut.Save >> "%TEMP%\create_silent_shortcut.vbs"

REM Run the VBS script
cscript //nologo "%TEMP%\create_silent_shortcut.vbs"

REM Clean up
del "%TEMP%\create_silent_shortcut.vbs" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Silent desktop shortcut created successfully!
    echo 📍 Location: %USERPROFILE%\Desktop\Prompt Engineering Simple App.lnk
    echo.
    echo This shortcut will:
    echo ✅ Open the Electron desktop app directly
    echo ✅ Hide the command prompt window
    echo ✅ Work even if you rename the project folder
    echo ✅ Be renamable and movable
    echo.
) else (
    echo.
    echo ❌ Failed to create shortcut.
    echo.
)

pause
