import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File upload config
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları kabul edilir'));
    }
  }
});

// In-memory database (for demo purposes)
// In production, use a real database like MongoDB
const photosDB = {
  // Structure: { eventId: [{ id, url, userId, caption, uploadedAt, fileName }] }
};

// Data dosyası
const dataFile = path.join(__dirname, '../data.json');

// Veritabanını yükle
function loadDatabase() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      Object.assign(photosDB, JSON.parse(data));
    }
  } catch (error) {
    console.log('Database yüklemesi başarısız, yeni başlıyoruz');
  }
}

// Veritabanını kaydet
function saveDatabase() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(photosDB, null, 2));
  } catch (error) {
    console.error('Database kaydetme hatası:', error);
  }
}

loadDatabase();

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    storage: 'Local JSON + ImgBB'
  });
});

// Upload photo with ImgBB
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { eventId, userId, caption } = req.body;

    if (!eventId || !userId || !req.file) {
      return res.status(400).json({ message: 'Eksik parametreler' });
    }

    // Upload to ImgBB
    const formData = new FormData();
    const buffer = req.file.buffer;
    const blob = new Blob([buffer], { type: req.file.mimetype });
    formData.append('image', blob, req.file.originalname);
    formData.append('key', process.env.IMGBB_API_KEY || 'a85bf9e97e5c0f39b7a2b1c3d4e5f6g7');

    let imageUrl;
    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        imageUrl = response.data.data.url;
      } else {
        throw new Error('ImgBB upload failed');
      }
    } catch (error) {
      // Fallback: Use base64 data URL (limited to ~1MB)
      imageUrl = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;
    }

    // Save to local database
    const photoId = uuidv4();
    const photoDoc = {
      id: photoId,
      eventId,
      userId,
      caption: caption || '',
      url: imageUrl,
      uploadedAt: new Date().toISOString(),
      fileName: req.file.originalname
    };

    if (!photosDB[eventId]) {
      photosDB[eventId] = [];
    }
    photosDB[eventId].push(photoDoc);
    saveDatabase();

    res.json({
      success: true,
      message: 'Fotoğraf başarıyla yüklendi',
      photo: photoDoc
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'Fotoğraf yükleme hatası: ' + error.message
    });
  }
});

// Get photos for event
app.get('/api/photos/:eventId', (req, res) => {
  try {
    const { eventId } = req.params;

    const photos = photosDB[eventId] || [];
    
    // Sort by uploadedAt descending
    photos.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    res.json({
      success: true,
      eventId,
      count: photos.length,
      photos
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      message: 'Fotoğraf getirme hatası: ' + error.message
    });
  }
});

// Delete photo
app.delete('/api/photos/:photoId', (req, res) => {
  try {
    const { photoId } = req.params;
    const { userId, eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID gerekli' });
    }

    const photos = photosDB[eventId];
    if (!photos) {
      return res.status(404).json({ message: 'Etkinlik bulunamadı' });
    }

    const photoIndex = photos.findIndex(p => p.id === photoId);
    if (photoIndex === -1) {
      return res.status(404).json({ message: 'Fotoğraf bulunamadı' });
    }

    const photo = photos[photoIndex];

    // Check ownership
    if (photo.userId !== userId) {
      return res.status(403).json({ message: 'Bu fotoğrafı silemezsiniz' });
    }

    // Delete
    photos.splice(photoIndex, 1);
    saveDatabase();

    res.json({
      success: true,
      message: 'Fotoğraf başarıyla silindi'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      message: 'Silme hatası: ' + error.message
    });
  }
});

// Get event stats
app.get('/api/events/:eventId/stats', (req, res) => {
  try {
    const { eventId } = req.params;

    const photos = photosDB[eventId] || [];
    const userIds = new Set(photos.map(p => p.userId));

    res.json({
      success: true,
      eventId,
      totalPhotos: photos.length,
      totalUsers: userIds.size,
      userList: Array.from(userIds)
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      message: 'İstatistik hatası: ' + error.message
    });
  }
});

// Export database (admin)
app.get('/api/admin/export', (req, res) => {
  try {
    res.json({
      success: true,
      data: photosDB,
      exportedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Export hatası' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Sunucu hatası: ' + err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend sunucusu http://localhost:${PORT} adresinde çalışıyor`);
  console.log(`📝 API dokümentasyonu:`);
  console.log(`   POST /api/upload - Fotoğraf yükle`);
  console.log(`   GET /api/photos/:eventId - Etkinlik fotoğraflarını getir`);
  console.log(`   DELETE /api/photos/:photoId - Fotoğraf sil`);
  console.log(`   GET /api/events/:eventId/stats - Etkinlik istatistikleri`);
  console.log(`\n💾 Veriler: data.json dosyasında saklanıyor`);
  console.log(`🌐 Resimler: ImgBB üzerine yükleniyor`);
});
