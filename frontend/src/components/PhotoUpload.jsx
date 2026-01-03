import React, { useState } from 'react';
import axios from 'axios';
import './PhotoUpload.css';

const PhotoUpload = ({ eventId, userId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [caption, setCaption] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Dosya boyutu 10MB\'dan küçük olmalıdır');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Lütfen bir resim dosyası seçin');
        return;
      }

      setSelectedFile(file);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Lütfen bir fotoğraf seçin');
      return;
    }

    if (!eventId) {
      setError('Lütfen bir düğün ID\'si girin');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('eventId', eventId);
      formData.append('userId', userId);
      formData.append('caption', caption);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await axios.post(`${apiUrl}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      setSelectedFile(null);
      setPreview(null);
      setCaption('');

      setTimeout(() => {
        setSuccess(false);
        onUploadSuccess?.();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Fotoğraf yükleme başarısız oldu');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      setTimeout(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        stream.getTracks().forEach(track => track.stop());

        canvas.toBlob((blob) => {
          const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
          setSelectedFile(file);
          setPreview(canvas.toDataURL('image/jpeg'));
          setError('');
        });
      }, 100);
    } catch (err) {
      setError('Kamera erişimi başarısız oldu');
    }
  };

  return (
    <div className="upload-container">
      <h2>📸 Fotoğraf Yükle</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">✓ Fotoğraf başarıyla yüklendi!</div>}

      <div className="upload-area">
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button 
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
                setCaption('');
              }}
              className="btn btn-secondary"
            >
              Başka Seç
            </button>
          </div>
        ) : (
          <div className="upload-options">
            <label className="file-input-label">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              📁 Galeriden Seç
            </label>
            <button 
              onClick={handleCameraCapture}
              className="btn btn-primary"
            >
              📷 Kamera ile Çek
            </button>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="caption-section">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Fotoğraf açıklaması (isteğe bağlı)"
            className="input-field"
            maxLength="100"
          />
          <small>{caption.length}/100</small>
        </div>
      )}

      {selectedFile && (
        <button 
          onClick={handleUpload}
          disabled={uploading}
          className="btn btn-success"
          style={{ opacity: uploading ? 0.6 : 1 }}
        >
          {uploading ? '⏳ Yükleniyor...' : '✓ Yükle'}
        </button>
      )}
    </div>
  );
};

export default PhotoUpload;
