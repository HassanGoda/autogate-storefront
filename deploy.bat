@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==========================================
echo   AutoGate Storefront - GitHub Deployer
echo ==========================================
echo.

:: إنشاء ملف .gitignore إذا لم يكن موجوداً
if not exist ".gitignore" (
    echo [1/5] Creating .gitignore file...
    (
        echo node_modules
        echo .next
        echo .env*
        echo .DS_Store
    ) > .gitignore
)

:: تهيئة مستودع Git إذا لم يكن مهيأً
if not exist ".git" (
    echo [2/5] Initializing Git repository...
    git init
    git branch -M main
    git remote add origin https://github.com/HassanGoda/autogate-storefront.git
) else (
    echo [2/5] Git repository already initialized.
)

:: طلب رسالة التحديث أو استخدام رسالة افتراضية
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update AutoGate storefront

echo.
echo [3/5] Adding files...
git add .

echo [4/5] Committing changes...
git commit -m "%COMMIT_MSG%"

echo [5/5] Pushing to GitHub...
git push -u origin main

echo.
echo ==========================================
echo   Done! Check GitHub and Vercel now.
echo ==========================================
pause