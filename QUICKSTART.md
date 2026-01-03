## 🚀 Wedding Photo Share - Başlangıç Kılavuzu

Tebrikler! Düğün fotoğraf paylaşım uygulamasını başarıyla oluşturdunuz!

### ⚡ HIZLI BAŞLAT (5 Dakika)

#### Windows Kullanıcıları - SEÇENEK 1 (Önerilen):
1. `setup.bat` dosyasına **çift tıklayın**
2. Kurulum otomatik olarak tamamlanacak
3. Adımlar:
   - Node.js 16+ gerekir ([indir](https://nodejs.org))
   - Tüm paketler otomatik kurulacak
   - `.env` dosyaları oluşturulacak

#### Windows Kullanıcıları - SEÇENEK 2 (Eğer ERESOLVE hatası aldıysanız):
1. `clean-install.bat` dosyasına **çift tıklayın**
2. Eski dosyalar silinip temiz kurulum yapılacak
3. Bu işlem daha uzun sürebilir (normal)

#### macOS/Linux Kullanıcıları:
```bash
chmod +x setup.sh
./setup.sh
```

---

## 📝 SONRAKI ADIMLAR (Basit Konfigürasyon)

**İYİ HABER:** Firebase konfigürasyonu **YÜKSÜZ!** Tamamen ücretsiz çözüm kullanıyoruz!

### 1️⃣ Backend .env Dosyasını Oluştur

`backend/.env` dosyasını oluştur:

```env
PORT=5000
IMGBB_API_KEY=a85bf9e97e5c0f39b7a2b1c3d4e5f6g7
```

**Bu kadar!** API key opsiyonel, varsayılan key kullanılır.

### 2️⃣ Frontend .env Dosyasını Oluştur

`frontend/.env` dosyasını oluştur:

```env
VITE_API_URL=http://localhost:5000
```

### 3️⃣ Uygulamayı Başlat!

```bash
npm run dev
```

---

## ✅ KURULUM KONTROL LİSTESİ

- [ ] Node.js 16+ yüklü
- [ ] setup.bat veya clean-install.bat çalıştırıldı
- [ ] backend/.env dosyası oluşturuldu
- [ ] frontend/.env dosyası oluşturuldu
- [ ] `npm run dev` komutu çalıştırıldı
- [ ] Frontend açıldı (http://localhost:5173)
- [ ] Backend çalışıyor (http://localhost:5000)
- [ ] QR kod oluşturulabiliyor
- [ ] Fotoğraf yükleme çalışıyor

---

## 🚀 UYGULAMAY BAŞLAT

Tüm adımlar tamamlandıktan sonra, proje klasöründe açın ve çalıştırın:

```bash
npm run dev
```

Otomatik olarak açılacak:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## 📱 KULLANIM

### Düğün Koordinatörü:
1. "📱 QR Kodu Göster" seçeneğini tıklayın
2. Bir ID girin: `ahmet-ayse-2024`
3. QR kodunu yazdırıp asın

### Konuklar:
1. Telefon kamerasiyle QR kodunu tarayın
2. Fotoğraf çekin ve yükleyin
3. Galeriyi görüntüleyin

---

## 🎯 ÖNEMLI DOSYALAR

| Dosya | İçerik |
|-------|--------|
| `FIREBASE_SETUP.md` | Detaylı Firebase rehberi |
| `README.md` | Tam dokümantasyon |
| `backend/.env` | Backend ayarları |
| `frontend/.env` | Frontend ayarları |
| `backend/firebase-key.json` | Firebase credentials (GİZLİ!) |

---

## ⚠️ YAYGÜN HATALAR VE ÇÖZÜMLERI

### "Cannot find module 'firebase-admin'"
→ `backend/firebase-key.json` dosyası mı eksik?

### "CORS Error"
→ Backend çalışıyor mu? http://localhost:5000/api/health kontrol edin

### "Storage bucket not configured"
→ `backend/.env` dosyasına FIREBASE_STORAGE_BUCKET eklediniz mi?

### "QR Kod Tarama Çalışmıyor"
→ HTTPS kullanın (localhost için exception var)
→ Tarayıcı kamera izni verdi mi?

---

## 🆘 YA BAŞARISIZ OLURSA?

1. `backend/firebase-key.json` dosyası var mı?
2. `.env` dosyaları dolduruldu mu?
3. Internet bağlantısı var mı?
4. Node.js sürümü 16+ mı? (`node -v`)
5. Firebase Storage/Firestore etkinleştirildi mi?

Daha fazla yardım için `FIREBASE_SETUP.md` veya `README.md` okuyun.

---

## 🎉 BAŞLAMA ZAMANI!

Tüm hazırlıklar tamamlandıysa, çalıştırın:

```bash
npm run dev
```

**Mutlu bir düğün kutlaması dilerim!** 💒✨

Herhangi bir sorun varsa, hata mesajını dikkatlice okuyun ve yukarıdaki çözümleri kontrol edin.
