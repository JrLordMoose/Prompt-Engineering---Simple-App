@echo off
title Prompt Engineering Simple App
echo Starting Prompt Engineering Simple App...
echo.

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Change to the project directory
cd /d "%CURRENT_DIR%"

REM Start the Electron app
npm run electron:dev

REM When the app exits, clean up any remaining processes
echo.
echo Cleaning up processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im electron.exe 2>nul

echo App closed successfully.
timeout /t 2 >nul
