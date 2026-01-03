# 💒 Wedding Photo Share - Düğün Fotoğraf Paylaşım Uygulaması

Konukların telefonlarından çekilen fotoğrafları kolayca paylaşabilecekleri, QR kod ile erişebilecekleri modern bir web uygulaması.

## 🌟 Özellikler

✅ **QR Kod Tarama** - Telefon kamerasiyle QR kodu tarayıp direkt uygulamaya erişin
✅ **Fotoğraf Yükleme** - Galeriden veya kamera ile fotoğraf çekin ve yükleyin
✅ **Bulut Depolama** - ImgBB ile ücretsiz resim hosting
✅ **Paylaşılan Galeri** - Tüm konukların fotoğraflarını tek yerden görün
✅ **Mobil Uyumlu** - Telefondan mükemmel çalışır
✅ **Tamamen Ücretsiz** - Hiçbir maliyet yok!

## 🛠️ Teknoloji Stack

### Frontend
- **React 18** - Modern UI kütüphanesi
- **Vite** - Hızlı build tool
- **QR Code** - QR kod oluşturma ve okuma
- **Axios** - HTTP client
- **CSS3** - Responsive tasarım

### Backend
- **Node.js + Express** - API sunucusu
- **ImgBB API** - Ücretsiz resim hosting
- **JSON Database** - Local data.json dosyası
- **Multer** - Dosya yükleme işlemleri

## 📋 Gereksinimler

- Node.js 16+
- npm veya yarn
- Modern web tarayıcı
- **Firebase gerekli değil!** ✅ Tamamen ücretsiz

## 🚀 Hızlı Başlangıç

### 1. Kurulumu Tamamla

Windows:
```
clean-install.bat dosyasına çift tıklayın
```

macOS/Linux:
```bash
chmod +x setup.sh && ./setup.sh
```

### 2. Backend Yapılandırması

```bash
cd backend
cp .env.example .env
npm run dev
```

**Not:** Firebase gerekli değil! Local data.json + ImgBB kullanıyoruz.

Backend `http://localhost:5000` adresinde çalışacak

### 3. Frontend Yapılandırması

```bash
cd frontend
cp .env.example .env
npm run dev
```

Frontend `http://localhost:5173` adresinde açılacak

## 📱 Kullanım

### Düğün Koordinatörü için:
1. "📱 QR Kodu Göster" seçeneğine tıklayın
2. Bir düğün ID'si girin (örn: ahmet-ayse-2024)
3. QR kodu indirin ve düğüne asın

### Konuklar için:
1. Telefon kamerası ile QR kodu tarayın
2. "📸 Fotoğraf Yükle" sekmesinde
3. Galeriden fotoğraf seçin veya kamera ile çekin
4. İsteğe bağlı açıklama ekleyin
5. Yükle butonuna basın

### Tüm Fotoğrafları Görüntülemek:
1. "🖼️ Galeriye Bak" sekmesine gidin
2. Tüm yüklenen fotoğrafları göreceksiniz
3. Fotoğrafa tıklayıp büyütülerek görüntüleyin
4. Kendi yüklediğiniz fotoğrafları silebilirsiniz

## 📂 Proje Yapısı

```
Weddingpp/
├── frontend/                 # React + Vite ön yüzü
│   ├── src/
│   │   ├── components/      # React bileşenleri
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   └── index.js        # API sunucusu
│   ├── .env.example
│   └── package.json
│
└── README.md               # Bu dosya
```

## 🔐 Güvenlik Notları

- Fotoğraflar Firebase Cloud Storage'da depolanır
- Veritabanı Firestore'da saklanır
- Her kullanıcı bir benzersiz ID alır
- Sadece kendi yüklediği fotoğrafları silebilir
- CORS etkinleştirilmiştir

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# dist klasörü deployment'a hazır
```

### Backend (Firebase Functions/Heroku/Railway)

```bash
npm run build
npm start
```

## 📞 Troubleshooting

### ⚠️ npm ERESOLVE Hatası (Çözüldü!)
**Hata:** `npm error ERESOLVE unable to resolve dependency tree`

**Çözüm 1 - Otomatik:** `clean-install.bat` dosyasına çift tıklayın

**Çözüm 2 - Manual:**
```bash
npm install --legacy-peer-deps
cd frontend && npm install --legacy-peer-deps && cd ..
cd backend && npm install --legacy-peer-deps && cd ..
```

Detaylar için: `NPM_ERROR_FIX.md` dosyasını okuyun

### CORS Hatası
- Backend'in CORS'u etkinleştirildiğinden emin olun
- Frontend ve Backend URL'lerini kontrol edin

### Fotoğraf Yüklenmiyor
- Firebase credentials'ını kontrol edin
- Storage bucket'ının aktif olup olmadığını kontrol edin
- Dosya boyutunun 10MB'den küçük olduğundan emin olun

### QR Kod Tarama Çalışmıyor
- HTTPS kullanın (localhost exception var)
- Tarayıcı izinlerini kontrol edin
- Kamera erişim izni verin

## 📄 Lisans

MIT

## 👨‍💻 Geliştirici

Bu proje Copilot tarafından oluşturulmuştur.

## 🙏 Katkı

Sorunlar ve öneriler için GitHub Issues açabilirsiniz.

---

**Başarılı bir düğün kutlaması dileriz!** 💒✨
