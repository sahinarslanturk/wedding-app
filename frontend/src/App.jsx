import React, { useState, useEffect } from 'react';
import './App.css';
import QRCodeGenerator from './components/QRCodeGenerator';
import PhotoUpload from './components/PhotoUpload';
import PhotoGallery from './components/PhotoGallery';

function App() {
  // Sabit event ID - tüm konuklar aynı QR kodu kullanacak
  const WEDDING_EVENT_ID = 'wedding-2024';
  
  const [currentPage, setCurrentPage] = useState('home');
  const [uniqueUserId, setUniqueUserId] = useState('');

  useEffect(() => {
    // Create or get unique user ID from localStorage
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    setUniqueUserId(userId);
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1 
          style={{ cursor: 'pointer' }}
          onClick={() => setCurrentPage('home')}
          title="Ana sayfaya dön"
        >
          💒 Wedding Photo Share
        </h1>
      </header>

      {currentPage === 'home' && (
        <div className="home-page">
          <div className="button-group">
            <button 
              className="btn btn-primary"
              onClick={() => setCurrentPage('qrcode')}
            >
              📱 QR Kodu Göster
            </button>
            <button 
              className="btn btn-success"
              onClick={() => setCurrentPage('upload')}
            >
              📸 Fotoğraf Yükle
            </button>
            <button 
              className="btn btn-info"
              onClick={() => setCurrentPage('gallery')}
            >
              🖼️ Galeriye Bak
            </button>
          </div>
        </div>
      )}

      {currentPage === 'qrcode' && (
        <div className="qrcode-page">
          <QRCodeGenerator eventId={WEDDING_EVENT_ID} />
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentPage('home')}
          >
            ← Geri
          </button>
        </div>
      )}

      {currentPage === 'upload' && (
        <div className="upload-page">
          <PhotoUpload 
            eventId={WEDDING_EVENT_ID} 
            userId={uniqueUserId}
            onUploadSuccess={() => setCurrentPage('gallery')}
          />
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentPage('home')}
          >
            ← Geri
          </button>
        </div>
      )}

      {currentPage === 'gallery' && (
        <div className="gallery-page">
          <PhotoGallery eventId={WEDDING_EVENT_ID} userId={uniqueUserId} />
          <button 
            className="btn btn-secondary"
            onClick={() => setCurrentPage('home')}
          >
            ← Geri
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
