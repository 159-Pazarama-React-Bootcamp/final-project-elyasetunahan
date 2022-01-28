import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import SuccessDetail from '../../components/Success';
import Wrapper from '../../components/Wrapper';
import db from '../../firebase';
import './index.css';

function ApplicationStatusPage() {
  const { basvuruNo } = useParams();
  const [application, setapplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplication = async () => {
    setLoading(true);
    const applicationData = await getDoc(doc(db, 'applications', basvuruNo));
    if (applicationData.exists()) {
      setapplication(applicationData.data());
    } else {
      alert('Veri çekilirken hata oluştu.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!application) {
    return <div>Not Found</div>;
  }

  return (
    <Wrapper>
      <h2> Başvuru Durumu</h2>
      <SuccessDetail title="basvuru no" value={basvuruNo} />
      <SuccessDetail title="İsminiz" value={application.isim} />
      <SuccessDetail title="Soyisminiz" value={application.soyisim} />
      <SuccessDetail title="Yaşınız" value={application.yas} />
      <SuccessDetail title="TC Kimlik No" value={application.tc} />
      <SuccessDetail title="Adresiniz" value={application.adres} />
      <SuccessDetail title="Başvurunuz" value={application.basvuru} />
      <SuccessDetail title="Mevcut Statü" value={application.status} />
      {application.answers?.map((item) => (
        <SuccessDetail key={item.id} title="Cevap" value={item.answer} />
      ))}
      <Link to="/basvuru-sorgula" className="success-btn">
        Farklı Başvuru Sorgula
      </Link>
    </Wrapper>
  );
}
export default ApplicationStatusPage;
