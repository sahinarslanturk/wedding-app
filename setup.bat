@echo off
setlocal enabledelayedexpansion

echo.
echo ======================================
echo Wedding Photo App - Setup Script
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

REM Get Node.js version
for /f "tokens=1" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% bulundu
echo.

REM Install main dependencies
echo 📦 Ana bağımlılıklar yükleniyor...
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Ana kurulum başarısız oldu
    pause
    exit /b 1
)

REM Install backend dependencies
echo.
echo ⚙️ Backend kurulumu yapılıyor...
cd backend
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend kurulumu başarısız oldu
    cd ..
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo .env dosyası oluşturuluyor...
    copy .env.example .env
)

cd ..

REM Install frontend dependencies
echo.
echo ⚙️ Frontend kurulumu yapılıyor...
cd frontend
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend kurulumu başarısız oldu
    cd ..
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo .env dosyası oluşturuluyor...
    copy .env.example .env
)

cd ..

echo.
echo ✅ Kurulum tamamlandı!
echo.
echo 📋 Sonraki Adımlar:
echo.
echo 1. Firebase Kurulumu ^(FIREBASE_SETUP.md dosyasını okuyun^):
echo    - Firebase Console'da proje oluşturun
echo    - Hizmet hesabı JSON anahtarını indirin
echo    - backend/firebase-key.json dosyasına yerleştirin
echo.
echo 2. Çevre Değişkenlerini Yapılandırın:
echo    - backend\.env dosyasında FIREBASE_STORAGE_BUCKET güncelleyin
echo    - frontend\.env dosyasında Firebase credentials ekleyin
echo.
echo 3. Uygulamayı Başlatın:
echo    npm run dev
echo.
echo 4. Tarayıcıda açın:
echo    Frontend: http://localhost:5173
echo    Backend: http://localhost:5000
echo.

pause
