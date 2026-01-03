import React, { useState, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import './QRCodeGenerator.css';

const QRCodeGenerator = ({ eventId }) => {
  const [inputEventId, setInputEventId] = useState(eventId || '');
  const [generatedEventId, setGeneratedEventId] = useState('');
  const qrRef = useRef();

  const generateQRCode = (id) => {
    const qrUrl = `${window.location.origin}?event=${id}`;
    
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'canvas',
      data: qrUrl,
      image: undefined,
      dotsOptions: {
        color: '#667eea',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      margin: 10,
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }

    return qrCode;
  };

  const handleGenerateQR = () => {
    if (inputEventId.trim()) {
      setGeneratedEventId(inputEventId);
      setTimeout(() => generateQRCode(inputEventId), 0);
    } else {
      alert('Lütfen bir düğün ID\'si girin!');
    }
  };

  const handleGenerateRandom = () => {
    const randomId = 'wedding_' + Date.now();
    setInputEventId(randomId);
    setGeneratedEventId(randomId);
    setTimeout(() => generateQRCode(randomId), 0);
  };

  const handleDownloadQR = async () => {
    if (!generatedEventId) return;
    
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'canvas',
      data: `${window.location.origin}?event=${generatedEventId}`,
      dotsOptions: {
        color: '#667eea',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      margin: 10,
    });

    qrCode.download({ name: `wedding-qr-${generatedEventId}`, extension: 'png' });
  };

  const qrUrl = `${window.location.origin}?event=${generatedEventId}`;

  return (
    <div className="qr-container">
      <h2>📱 QR Kod Oluştur</h2>
      
      <div className="input-group">
        <input
          type="text"
          value={inputEventId}
          onChange={(e) => setInputEventId(e.target.value)}
          placeholder="Düğün ID'si girin (örn: ahmet-ayse-2024)"
          className="input-field"
          onKeyPress={(e) => e.key === 'Enter' && handleGenerateQR()}
        />
        <button onClick={handleGenerateQR} className="btn btn-primary">
          Oluştur
        </button>
        <button onClick={handleGenerateRandom} className="btn btn-secondary">
          Rastgele Oluştur
        </button>
      </div>

      {generatedEventId && (
        <div className="qr-result">
          <div className="qr-display" ref={qrRef}>
            {/* QR Code will be rendered here */}
          </div>
          
          <div className="qr-info">
            <p><strong>Düğün ID:</strong> {generatedEventId}</p>
            <p><strong>Link:</strong> <code>{qrUrl}</code></p>
            <button onClick={handleDownloadQR} className="btn btn-success">
              📥 QR Kodu İndir
            </button>
          </div>

          <div className="qr-instructions">
            <h3>📋 Talimatlar:</h3>
            <ol>
              <li>Bu QR kodu yazdırıp düğüne asın</li>
              <li>Konuklar kameralarıyla QR kodu tarasınlar</li>
              <li>Fotoğraf yükleme sayfasına otomatik yönlendirilecekler</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
