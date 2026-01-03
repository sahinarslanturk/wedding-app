import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhotoGallery.css';

const PhotoGallery = ({ eventId, userId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterUserId, setFilterUserId] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, [eventId]);

  const fetchPhotos = async () => {
    if (!eventId) {
      setError('Düğün ID\'si bulunamadı');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await axios.get(`${apiUrl}/api/photos/${eventId}`);
      setPhotos(response.data.photos || []);
      setError('');
    } catch (err) {
      setError('Fotoğraflar yüklenemedi');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = filterUserId 
    ? photos.filter(p => p.userId === filterUserId)
    : photos;

  const userIds = [...new Set(photos.map(p => p.userId))];

  const handleDelete = async (photoId) => {
    if (!confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      await axios.delete(`${apiUrl}/api/photos/${photoId}`, {
        data: { userId }
      });
      setPhotos(photos.filter(p => p.id !== photoId));
      setSelectedPhoto(null);
    } catch (err) {
      alert('Silme işlemi başarısız oldu');
    }
  };

  if (loading) {
    return (
      <div className="gallery-container">
        <h2>🖼️ Fotoğraf Galerisi</h2>
        <div className="loading">⏳ Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h2>🖼️ Fotoğraf Galerisi</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="gallery-stats">
        <p>📊 Toplam {photos.length} fotoğraf</p>
      </div>

      {userIds.length > 0 && (
        <div className="filter-section">
          <label>Filtrele:</label>
          <select 
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            className="filter-select"
          >
            <option value="">Tümü</option>
            {userIds.map(id => (
              <option key={id} value={id}>
                Kişi {id.substring(0, 8)}...
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredPhotos.length === 0 ? (
        <div className="empty-state">
          <p>📸 Henüz fotoğraf yüklenmedi</p>
          <p>İlk fotoğrafı yüklemek için yukarıdaki düğmeyi kullanın</p>
        </div>
      ) : (
        <div className="photos-grid">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              className="photo-card"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo.url} 
                alt="Wedding photo"
                className="photo-thumbnail"
              />
              {photo.caption && (
                <p className="photo-caption">{photo.caption}</p>
              )}
              <small className="photo-date">
                {new Date(photo.uploadedAt).toLocaleDateString('tr-TR')}
              </small>
            </div>
          ))}
        </div>
      )}

      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
            <img 
              src={selectedPhoto.url} 
              alt="Full size"
              className="modal-image"
            />
            <div className="modal-info">
              {selectedPhoto.caption && (
                <p><strong>Açıklama:</strong> {selectedPhoto.caption}</p>
              )}
              <p><strong>Yükleyen:</strong> Kişi {selectedPhoto.userId.substring(0, 8)}...</p>
              <p><strong>Tarih:</strong> {new Date(selectedPhoto.uploadedAt).toLocaleString('tr-TR')}</p>
              
              {selectedPhoto.userId === userId && (
                <button
                  onClick={() => handleDelete(selectedPhoto.id)}
                  className="btn btn-error"
                >
                  🗑️ Sil
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
