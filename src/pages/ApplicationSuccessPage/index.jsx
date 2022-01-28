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
      <SuccessDetail title="isim" value={application.isim} />
      <SuccessDetail title="soyisim" value={application.soyisim} />
      <SuccessDetail title="yas" value={application.yas} />
      <SuccessDetail title="tc" value={application.tc} />
      <SuccessDetail title="adres" value={application.adres} />
      <SuccessDetail title="basvuru" value={application.basvuru} />
      <Link to="/basvuru-sorgula" className="success-btn">
        Farklı Başvuru Sorgula
      </Link>
    </div>
  );
}

export default ApplicationSuccessPage;
