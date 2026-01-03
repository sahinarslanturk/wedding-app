#!/bin/bash

echo "======================================"
echo "Wedding Photo App - Setup Script"
echo "======================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamadı. Lütfen Node.js 16+ yükleyin"
    exit 1
fi

echo "✓ Node.js $(node -v) bulundu"
echo ""

# Install dependencies
echo "📦 Bağımlılıklar yükleniyor..."
npm install --legacy-peer-deps

echo ""
echo "⚙️ Backend kurulumu yapılıyor..."
cd backend
npm install --legacy-peer-deps
if [ ! -f ".env" ]; then
    cp .env.example .env
fi
cd ..

echo ""
echo "⚙️ Frontend kurulumu yapılıyor..."
cd frontend
npm install --legacy-peer-deps
if [ ! -f ".env" ]; then
    cp .env.example .env
fi
cd ..

echo ""
echo "✅ Kurulum tamamlandı!"
echo ""
echo "📋 Sonraki Adımlar:"
echo ""
echo "1. Firebase Kurulumu (FIREBASE_SETUP.md dosyasını okuyun):"
echo "   - Firebase Console'da proje oluşturun"
echo "   - Hizmet hesabı JSON anahtarını indirin"
echo "   - backend/firebase-key.json dosyasına yerleştirin"
echo ""
echo "2. Çevre Değişkenlerini Yapılandırın:"
echo "   - backend/.env dosyasında FIREBASE_STORAGE_BUCKET güncelleyin"
echo "   - frontend/.env dosyasında Firebase credentials ekleyin"
echo ""
echo "3. Uygulamayı Başlatın:"
echo "   npm run dev"
echo ""
echo "4. Tarayıcıda açın:"
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:5000"
echo ""
