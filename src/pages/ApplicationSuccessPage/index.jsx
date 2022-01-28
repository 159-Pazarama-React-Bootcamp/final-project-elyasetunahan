import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import SuccessDetail from '../../components/Success';
import './index.css';

function ApplicationSuccessPage() {
  const { application } = useSelector((state) => state.createApplication);

  return (
    <div className="success-form">
      <div className="success-title">
        <BsCheck2Circle className="success-icon" />
        Başvurunuz Başarıyla Alınmıştır
      </div>
      <SuccessDetail title="Basvuru no" value={application.id} />
      <SuccessDetail title="İsminiz" value={application.isim} />
      <SuccessDetail title="Soyisminiz" value={application.soyisim} />
      <SuccessDetail title="Yaşınız" value={application.yas} />
      <SuccessDetail title="TC Kimlik No" value={application.tc} />
      <SuccessDetail title="Adresiniz" value={application.adres} />
      <SuccessDetail title="Başvurunuz" value={application.basvuru} />
      <Link to="/basvuru-sorgula" className="success-btn">
        Farklı Başvuru Sorgula
      </Link>
    </div>
  );
}

export default ApplicationSuccessPage;
