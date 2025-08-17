Write-Host "Starting Prompt Engineering Simple App..." -ForegroundColor Green
Write-Host ""
Write-Host "This will:" -ForegroundColor Yellow
Write-Host "1. Start the development server" -ForegroundColor White
Write-Host "2. Open the desktop application" -ForegroundColor White
Write-Host "3. Automatically open in your default browser" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Cyan
Write-Host ""

try {
    npm run electron:dev
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure you have Node.js and npm installed." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
}
