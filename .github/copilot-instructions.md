# 💒 Wedding Photo Share - Proje Talimatları

## Proje Özeti

Düğün fotoğraf paylaşım uygulaması - Konuklar QR kod tarayarak fotoğraf yükleyebilir ve paylaşabilir.

### Ana Özellikler
- ✅ QR kod oluşturma ve tarama
- ✅ Mobil kameradan fotoğraf çekme/yükleme
- ✅ Firebase bulut depolaması
- ✅ Paylaşılan fotoğraf galerisi
- ✅ Responsive mobil tasarım
- ✅ Benzersiz kullanıcı ID'leri

## Teknoloji Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Cloud**: Firebase (Storage + Firestore)
- **QR Code**: qrcode.react + html5-qrcode

## ✅ Tamamlanan Görevler

- [x] Proje dizin yapısı oluşturuldu
- [x] Frontend - React + Vite kuruldu
- [x] Backend - Node.js + Express kuruldu
- [x] QRCodeGenerator bileşeni oluşturuldu
- [x] PhotoUpload bileşeni oluşturuldu
- [x] PhotoGallery bileşeni oluşturuldu
- [x] Express API endpoints oluşturuldu
- [x] Responsive CSS tasarımı yapıldı
- [x] Firebase Firestore entegrasyonu
- [x] Firebase Storage entegrasyonu
- [x] Kurulum scriptleri (setup.bat, setup.sh)
- [x] Dokümantasyon (README.md, QUICKSTART.md, FIREBASE_SETUP.md)

## Proje Dosya Yapısı

```
frontend/
  ├── src/components/
  │   ├── QRCodeGenerator.jsx     # QR kod oluşturma
  │   ├── PhotoUpload.jsx         # Fotoğraf yükleme
  │   └── PhotoGallery.jsx        # Galeri görüntüleme
  ├── App.jsx                     # Ana bileşen
  └── index.css                   # Stil

backend/
  └── src/index.js                # Express API sunucusu
```

## Başlangıç İçin

1. **Windows**: setup.bat çift tıkla
2. **macOS/Linux**: `chmod +x setup.sh && ./setup.sh`
3. Firebase yapılandırması: QUICKSTART.md oku
4. `npm run dev` - Uygulamayı başlat

## Önemli Dosyalar

| Dosya | Açıklama |
|-------|----------|
| QUICKSTART.md | Hızlı kurulum rehberi |
| FIREBASE_SETUP.md | Firebase adım adım |
| README.md | Tam dokümantasyon |
| setup.bat | Windows kurulum |
| setup.sh | Unix kurulum |
