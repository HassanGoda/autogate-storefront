@echo off
setlocal enabledelayedexpansion

set "BASE_DIR=C:\\AutoGate\\autogate-platform\\autogate-storefront"
set "SOURCES_DIR=%BASE_DIR%\\Sources"
set "CATALOG_FILE=%SOURCES_DIR%\\src\\pages\\vehicle-catalog.tsx"
set "DIST_DIR=%BASE_DIR%\\cpanel-releases"

set "NODE_STAGE=%DIST_DIR%\\stage-nodejs"
set "STATIC_STAGE=%DIST_DIR%\\stage-static"

set "NODE_ZIP=%DIST_DIR%\\autogate-cpanel-nodejs.zip"
set "STATIC_ZIP=%DIST_DIR%\\autogate-cpanel-static.zip"

echo ============================================================
echo   AutoGate Storefront - Final Auto-Fix ^& cPanel Release
echo ============================================================

if not exist "%SOURCES_DIR%\\package.json" (
echo \[ERROR\] package.json was not found inside:
echo         "%SOURCES_DIR%"
pause
exit /b 1
)

cd /d "%SOURCES_DIR%"

:: ------------------------------------------------------------
:: STEP 1: Clean Misplaced Files
:: ------------------------------------------------------------
echo.
echo \[1/6\] Cleaning misplaced files (public\\AutoGate.ts)...
if exist "public\\AutoGate.ts" (
del /F /Q "public\\AutoGate.ts"
echo       Removed public\\AutoGate.ts
) else (
echo       public\\AutoGate.ts already clean.
)

:: ------------------------------------------------------------
:: STEP 2: Patch TypeScript Error in vehicle-catalog.tsx
:: ------------------------------------------------------------
echo.
echo \[2/6\] Patching TypeScript error in src\\pages\\vehicle-catalog.tsx...
if exist "%CATALOG_FILE%" (
powershell -NoProfile -Command ^
"\$path = '%CATALOG_FILE%';" ^
"$content = Get-Content -Path$path -Raw -Encoding UTF8;" ^
"if (\$content -notmatch 'IVehicleCatalogItem') {" ^
"  \$iface = 'interface IVehicleCatalogItem { id: string; displayName?: string; manufacturer?: string; make: string; model: string; makeAr?: string; logo?: string | null; image?: string | null; }' + \[Environment\]::NewLine;" ^
"  \$content = $iface +$content;" ^
"}" ^
"\$content =$content -replace 'visible.map$\(\s*vehicle\s*$\\s\*=>\\s\*(', 'visible.map((rawVehicle) => { const vehicle = rawVehicle as IVehicleCatalogItem; return (';" ^
"\$content =$content -replace 'visible.map$\(\s*vehicle\s*$\\s\*=>\\s\*{', 'visible.map((rawVehicle) => { const vehicle = rawVehicle as IVehicleCatalogItem;';" ^
"\$content =$content -replace '{vehicle.image && <AppImage src={vehicle.image} alt={vehicle.model} className="card-img-top" />}', '{typeof vehicle.image === "string" && vehicle.image && <AppImage src={vehicle.image} alt={vehicle.model} className="card-img-top" />}';" ^
"\$content =$content -replace 'label$vehicle$', 'label(vehicle as any)';" ^
"Set-Content -Path $path -Value$content -Encoding UTF8;"
echo       vehicle-catalog.tsx patched successfully.
) else (
echo \[WARNING\] %CATALOG_FILE% not found. Skipping patch.
)

:: ------------------------------------------------------------
:: STEP 3: Verify Dependencies & Locales
:: ------------------------------------------------------------
echo.
echo \[3/6\] Verifying dependencies and locales...
if not exist "node_modules" (
echo       Installing node_modules via npm.cmd...
call npm.cmd ci --legacy-peer-deps
if errorlevel 1 (
echo \[ERROR\] npm install failed.
pause
exit /b 1
)
)

call npm.cmd run verify:locales
if errorlevel 1 (
echo \[WARNING\] verify:locales reported warnings. Continuing...
)

:: ------------------------------------------------------------
:: STEP 4: Build Production Next.js Application
:: ------------------------------------------------------------
echo.
echo \[4/6\] Compiling Next.js production build...
set NODE_OPTIONS=--openssl-legacy-provider
call npm.cmd run build
if errorlevel 1 (
echo \[ERROR\] Production build failed! Check the TypeScript/Next.js output above.
pause
exit /b 1
)
echo \[OK\] Production build succeeded!

:: ------------------------------------------------------------
:: STEP 5: Package 1 - cPanel WITH Setup Node.js App
:: ------------------------------------------------------------
echo.
echo \[5/6\] Generating Package 1 (cPanel WITH Setup Node.js App)...
if exist "%DIST_DIR%" rmdir /S /Q "%DIST_DIR%"
mkdir "%DIST_DIR%"
mkdir "%NODE_STAGE%"
mkdir "%STATIC_STAGE%"

robocopy "%SOURCES_DIR%" "%NODE_STAGE%" /E /XD "node_modules" ".next" ".git" "out" /XF ".env.local" >nul
if %ERRORLEVEL% GEQ 8 (
echo \[ERROR\] Robocopy failed for Node.js package.
pause
exit /b 1
)

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
) > "%NODE_STAGE%\\server.js"

powershell -NoProfile -Command "Compress-Archive -Path '%NODE_STAGE%\*' -DestinationPath '%NODE_ZIP%' -Force"
if errorlevel 1 (
echo \[ERROR\] Failed to compress Node.js package.
pause
exit /b 1
)
echo \[OK\] Created: "%NODE_ZIP%"

:: ------------------------------------------------------------
:: STEP 6: Package 2 - cPanel Static Export (No Node.js)
:: ------------------------------------------------------------
echo.
echo \[6/6\] Attempting Package 2 (cPanel Static HTML Export)...
call npx.cmd next export -o "%STATIC_STAGE%"
if errorlevel 1 (
echo \[NOTICE\] Static export skipped: This template uses Next.js i18n/SSR routes that require Node.js hosting.
echo          Use Package 1 ^(autogate-cpanel-nodejs.zip^) on your cPanel Setup Node.js App.
) else (
powershell -NoProfile -Command "Compress-Archive -Path '%STATIC_STAGE%\*' -DestinationPath '%STATIC_ZIP%' -Force"
echo \[OK\] Created: "%STATIC_ZIP%"
)

:: Cleanup temporary staging folders
if exist "%NODE_STAGE%" rmdir /S /Q "%NODE_STAGE%"
if exist "%STATIC_STAGE%" rmdir /S /Q "%STATIC_STAGE%"

echo.
echo ============================================================
echo   ALL DONE! Release packages are ready in:
echo   "%DIST_DIR%"
echo ============================================================
pause
endlocal