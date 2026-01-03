# Firebase Kurulum Rehberi

## Firebase Console'da Proje Oluşturma

### 1. Proje Oluştur
1. [Firebase Console](https://console.firebase.google.com) ziyaret edin
2. "Proje Ekle" butonuna tıklayın
3. Proje adını girin (örn: "Wedding Photos")
4. Google Analytics'i etkinleştirin (opsiyonel)
5. Proje oluşturun

### 2. Cloud Storage'ı Etkinleştir
1. Sol menüden "Build" → "Storage" seçin
2. "Başla" butonuna tıklayın
3. Başlangıç kurallarını seçin (Production mode)
4. Region seçin (önerilen: us-central1)
5. Oluştur

### 3. Firestore Database'i Etkinleştir
1. Sol menüden "Build" → "Firestore Database" seçin
2. "Veritabanı oluştur" butonuna tıklayın
3. Production mode seçin
4. Region seçin (Storage ile aynı)
5. Oluştur

### 4. Authentication'ı Etkinleştir (İsteğe bağlı)
1. Sol menüden "Build" → "Authentication" seçin
2. "Başla" butonuna tıklayın
3. İsteğe bağlı: Google Sign-in ekleyin

## Backend Yapılandırması

### 1. Hizmet Hesabı Oluştur
1. Firebase Console'da "Proje Ayarları" (⚙️) tıklayın
2. "Hizmet Hesapları" sekmesini seçin
3. "Python/Node.js" bölümüne scroll yapın
4. "Yeni özel anahtar oluştur" butonuna tıklayın
5. JSON dosyası indirilecek
6. İndirilen dosyayı `backend/firebase-key.json` olarak kaydedin

### 2. Backend .env Dosyasını Yapılandır
```bash
cd backend
cp .env.example .env
```

.env dosyasını açıp şu bilgileri girin:
- `FIREBASE_STORAGE_BUCKET`: Firebase Console → Proje Ayarları → genel → Storage bucket URL

Örnek:
```env
PORT=5000
FIREBASE_STORAGE_BUCKET=wedding-photos-project.appspot.com
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-key.json
```

## Frontend Yapılandırması

### 1. Web Uygulaması Ekle
1. Firebase Console'da `</>` (Web) ikonu tıklayın
2. Uygulama adını girin
3. Firebase Hosting'i seçebilirsiniz
4. Yapılandırma bilgilerini kopyalayın

### 2. Frontend .env Dosyasını Yapılandır
```bash
cd frontend
cp .env.example .env
```

.env dosyasını açıp Firebase yapılandırma bilgilerini ekleyin:
```env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=wedding-photos.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=wedding-photos-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=wedding-photos.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Firestore Güvenlik Kuralları

Storage için `storage.rules` dosyası:

```plaintext
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Firestore için `firestore.rules` dosyası:

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /photos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Kontrol Listesi

- [ ] Firebase projesi oluşturdum
- [ ] Cloud Storage'ı etkinleştirdim
- [ ] Firestore Database'i etkinleştirdim
- [ ] Hizmet hesabı JSON anahtarını indirdim
- [ ] Backend firebase-key.json dosyasını yerleştirdim
- [ ] Backend .env dosyasını yapılandırdım
- [ ] Frontend .env dosyasını yapılandırdım
- [ ] Güvenlik kurallarını güncelledim

## Test Etme

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Backend http://localhost:5000
Frontend http://localhost:5173

## Sorun Giderme

### "Firebase initialization error"
- firebase-key.json dosyası mı eksik?
- Dosya backend klasöründe mi?
- JSON dosyası geçerli mi?

### "Storage bucket not configured"
- .env dosyasında FIREBASE_STORAGE_BUCKET doğru mu?
- Firebase Console'da Storage etkinleştirilmiş mi?

### CORS Hatası
- Backend CORS etkinleştirilmiş mi?
- Frontend ve Backend URL'ler doğru mu?

## Deployment Hazırlığı

Firebase Hosting'e yayınlamak için:

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```
