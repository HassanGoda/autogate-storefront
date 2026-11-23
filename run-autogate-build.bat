@echo off
setlocal enabledelayedexpansion

set "BASE_DIR=C:\AutoGate\autogate-platform\autogate-storefront"
set "SOURCES_DIR=%BASE_DIR%\Sources"
set "CATALOG_FILE=%SOURCES_DIR%\src\pages\vehicle-catalog.tsx"
set "DIST_DIR=%BASE_DIR%\cpanel-releases"

set "NODE_STAGE=%DIST_DIR%\stage-nodejs"
set "STATIC_STAGE=%DIST_DIR%\stage-static"

set "NODE_ZIP=%DIST_DIR%\autogate-cpanel-nodejs.zip"
set "STATIC_ZIP=%DIST_DIR%\autogate-cpanel-static.zip"

echo ============================================================
echo   AutoGate Storefront - Clean, Patch ^& Build
echo ============================================================

if not exist "%SOURCES_DIR%\package.json" (
    echo [ERROR] package.json was not found inside: "%SOURCES_DIR%"
    pause
    exit /b 1
)

cd /d "%SOURCES_DIR%"

echo [1/5] Removing misplaced AutoGate.ts files...
if exist "public\AutoGate.ts" del /F /Q "public\AutoGate.ts"
if exist "%BASE_DIR%\AutoGate.ts" del /F /Q "%BASE_DIR%\AutoGate.ts"

echo [2/5] Fixing vehicle-catalog.tsx via Node.js script...
if exist "%CATALOG_FILE%" (
    node -e "const fs = require('fs'); const p = process.argv[1]; let s = fs.readFileSync(p, 'utf8'); if (!s.includes('IVehicleCatalogItem')) { s = 'interface IVehicleCatalogItem { id: string; displayName?: string; manufacturer?: string; make: string; model: string; makeAr?: string; logo?: string | null; image?: string | null; }\n' + s; } s = s.replace(/visible\.map\(\s*\(?\s*vehicle\s*\)?\s*=>\s*\(/g, 'visible.map((rawVehicle) => { const vehicle = rawVehicle as IVehicleCatalogItem; return ('); s = s.replace(/visible\.map\(\s*\(?\s*vehicle\s*\)?\s*=>\s*\{/g, 'visible.map((rawVehicle) => { const vehicle = rawVehicle as IVehicleCatalogItem;'); s = s.replace(/\{vehicle\.image\s*&&\s*<AppImage\s+src=\{vehicle\.image\}\s+alt=\{vehicle\.model\}\s+className=\"card-img-top\"\s*\/>?\}/g, '{typeof vehicle.image === \"string\" && vehicle.image && <AppImage src={vehicle.image} alt={vehicle.model} className=\"card-img-top\" />}'); s = s.replace(/label\(vehicle\)/g, 'label(vehicle as any)'); fs.writeFileSync(p, s, 'utf8'); console.log('Patched vehicle-catalog.tsx');" "%CATALOG_FILE%"
)

echo [3/5] Verifying locales and building Next.js project...
call npm.cmd run verify:locales
if exist ".next" rmdir /S /Q ".next"
set NODE_OPTIONS=--openssl-legacy-provider
call npm.cmd run build
if errorlevel 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo [4/5] Packaging cPanel Node.js release...
if exist "%DIST_DIR%" rmdir /S /Q "%DIST_DIR%"
mkdir "%DIST_DIR%"
mkdir "%NODE_STAGE%"
mkdir "%STATIC_STAGE%"

robocopy "%SOURCES_DIR%" "%NODE_STAGE%" /E /XD "node_modules" ".next" ".git" "out" /XF ".env.local" "AutoGate.ts" >nul

(
echo const { createServer } = require^('http'^);
echo const { parse } = require^('url'^);
echo const next = require^('next'^);
echo.
echo const dev = false;
echo const app = next^({ dev }^);
echo const handle = app.getRequestHandler^(^);
echo const port = process.env.PORT ^|^| 3000;
echo.
echo app.prepare^(^).then^(^(^) =^> {
echo   createServer^(^(req, res^) =^> {
echo     const parsedUrl = parse^(req.url, true^);
echo     handle^(req, res, parsedUrl^);
echo   }^).listen^(port, ^(err^) =^> {
echo     if ^(err^) throw err;
echo     console.log^('^> AutoGate Storefront ready on port ' + port^);
echo   }^);
echo }^);
) > "%NODE_STAGE%\server.js"

powershell -NoProfile -Command "Compress-Archive -Path '%NODE_STAGE%\*' -DestinationPath '%NODE_ZIP%' -Force"

echo [5/5] Attempting Static HTML Export...
call npx.cmd next export -o "%STATIC_STAGE%"
if not errorlevel 1 (
    powershell -NoProfile -Command "Compress-Archive -Path '%STATIC_STAGE%\*' -DestinationPath '%STATIC_ZIP%' -Force"
)

if exist "%NODE_STAGE%" rmdir /S /Q "%NODE_STAGE%"
if exist "%STATIC_STAGE%" rmdir /S /Q "%STATIC_STAGE%"

echo DONE! Output in: "%DIST_DIR%"
pause
endlocal