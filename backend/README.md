# Wedding Photo Backend

Node.js + Express API sunucusu

## Kurulum

```bash
npm install
```

## Firebase Yapılandırması

1. Firebase Console'dan hizmet hesabı JSON anahtarını indirin
2. `firebase-key.json` dosyasını proje kök dizinine yerleştirin
3. `.env` dosyasını oluşturun:

```env
PORT=5000
FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
```

## Geliştirme

```bash
npm run dev
```

## Başlat

```bash
npm start
```

## API Endpoints

### Upload Photo
- **POST** `/api/upload`
- Body: `multipart/form-data`
  - `file`: Resim dosyası
  - `eventId`: Düğün ID'si
  - `userId`: Kullanıcı ID'si
  - `caption`: Resim başlığı (opsiyonel)

### Get Photos
- **GET** `/api/photos/:eventId`
- Response: Tüm fotoğraflar listesi

### Delete Photo
- **DELETE** `/api/photos/:photoId`
- Body: `{ userId }`

### Event Stats
- **GET** `/api/events/:eventId/stats`
- Response: Etkinlik istatistikleri
