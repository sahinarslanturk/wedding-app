import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import './QRCodeGenerator.css';

const QRCodeGenerator = ({ eventId }) => {
  const qrRef = useRef();

  useEffect(() => {
    // Otomatik olarak QR kod oluştur
    if (eventId) {
      generateQRCode(eventId);
    }
  }, [eventId]);

  const generateQRCode = (id) => {
    const qrUrl = `${window.location.origin}/wedding-app/?event=${id}`;
    
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

  const handleDownloadQR = () => {
    if (!eventId) return;
    
    const qrUrl = `${window.location.origin}/wedding-app/?event=${eventId}`;
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'canvas',
      data: qrUrl,
      dotsOptions: {
        color: '#667eea',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      margin: 10,
    });

    qrCode.download({ name: `wedding-qr-${eventId}`, extension: 'png' });
  };

  const qrUrl = `${window.location.origin}/wedding-app/?event=${eventId}`;

  return (
    <div className="qr-container">
      <h2>📱 Düğün QR Kodu</h2>
      
      <p className="event-id-info">
        <strong>Event ID:</strong> <code>{eventId}</code>
      </p>

      <div className="qr-result">
        <div className="qr-display" ref={qrRef}>
          {/* QR Code will be rendered here */}
        </div>
        
        <div className="qr-info">
          <p><strong>QR Kod Linki:</strong></p>
          <code className="qr-url">{qrUrl}</code>
          <button onClick={handleDownloadQR} className="btn btn-success">
            📥 QR Kodu İndir
          </button>
        </div>

        <div className="qr-instructions">
          <h3>📋 Talimatlar:</h3>
          <ol>
            <li>Bu QR kodu yazdırıp düğüne asın</li>
            <li>Konuklar kameralarıyla QR kodu tarasınlar</li>
            <li>Otomatik olarak fotoğraf yükleme sayfasına gidecekler</li>
            <li>Fotoğraf seçip yükleyebilirler</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
