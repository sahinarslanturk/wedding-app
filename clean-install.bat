@echo off
setlocal enabledelayedexpansion

echo.
echo ======================================
echo Wedding Photo App - Clean & Reinstall
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js bulunamadı. Lütfen Node.js 16+ yükleyin
    echo Indirme linki: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js yüklü
echo.
echo 🧹 Eski dosyalar temizleniyor...
echo.

REM Delete root node_modules and package-lock
if exist "node_modules" (
    echo Siliniyor: node_modules
    rmdir /s /q node_modules
)
if exist "package-lock.json" (
    echo Siliniyor: package-lock.json
    del package-lock.json
)

REM Delete frontend node_modules and package-lock
cd frontend
if exist "node_modules" (
    echo Siliniyor: frontend/node_modules
    cd ..
    rmdir /s /q frontend\node_modules
    cd frontend
)
if exist "package-lock.json" (
    echo Siliniyor: frontend/package-lock.json
    del package-lock.json
)
cd ..

REM Delete backend node_modules and package-lock
cd backend
if exist "node_modules" (
    echo Siliniyor: backend/node_modules
    cd ..
    rmdir /s /q backend\node_modules
    cd backend
)
if exist "package-lock.json" (
    echo Siliniyor: backend/package-lock.json
    del package-lock.json
)
cd ..

echo.
echo 📦 Temiz kurulum yapılıyor...
echo.

REM Install root dependencies
echo ⬇️ Root paketleri kuruluyor...
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Root kurulum başarısız
    pause
    exit /b 1
)

REM Install backend dependencies
echo.
echo ⬇️ Backend paketleri kuruluyor...
cd backend
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend kurulum başarısız
    cd ..
    pause
    exit /b 1
)
cd ..

REM Install frontend dependencies
echo.
echo ⬇️ Frontend paketleri kuruluyor...
cd frontend
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend kurulum başarısız
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ Kurulum tamamlandı!
echo.
echo 🚀 Şimdi çalıştırabilirsiniz:
echo.
echo    npm run dev
echo.
echo Tarayıcıda açın:
echo    Frontend: http://localhost:5173
echo    Backend: http://localhost:5000
echo.

pause
