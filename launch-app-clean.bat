@echo off
title Prompt Engineering Simple App
echo Starting Prompt Engineering Simple App...
echo.

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

REM Change to the project directory
cd /d "%CURRENT_DIR%"

REM Start the Electron app and capture the process ID
start /b npm run electron:dev
set "NPM_PID=%ERRORLEVEL%"

REM Wait for the Electron app to start
timeout /t 3 >nul

REM Monitor for Electron process
:monitor
tasklist /fi "imagename eq electron.exe" 2>nul | find /i "electron.exe" >nul
if %ERRORLEVEL% EQU 0 (
    timeout /t 1 >nul
    goto monitor
)

REM Electron process ended, clean up
echo.
echo Cleaning up processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im electron.exe 2>nul
taskkill /f /im npm.exe 2>nul

echo App closed successfully.
timeout /t 2 >nul
