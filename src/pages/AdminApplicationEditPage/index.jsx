import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/Button';
import FormInput from '../../components/Input';
import Spinner from '../../components/Spinner';
import SuccessDetail from '../../components/Success';
import Wrapper from '../../components/Wrapper';
import db from '../../firebase';
import { createAnswerSchema } from '../../validations/Application';
import './index.css';

function AdminApplicationEditPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [application, setapplication] = useState(null);
  const [status, setStatus] = useState(null);
  const { basvuruNo } = useParams();

  const fetchApplication = async () => {
    setLoading(true);
    const applicationData = await getDoc(doc(db, 'applications', basvuruNo));
    if (applicationData.exists()) {
      setapplication(applicationData.data());
      setStatus(applicationData.data().status);
    } else {
      alert('Veri çekilirken hata oluştu.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const handleCreateAnswer = async (answer) => {
    const applicationRef = doc(db, 'applications', basvuruNo);
    await updateDoc(applicationRef, {
      answers: [...application.answers, { answer }],
      status,
    });
    setapplication({
      ...application,
      answers: [...application.answers, { answer }],
      status,
    });
  };

  const formik = useFormik({
    initialValues: {
      answer: '',
    },
    validationSchema: createAnswerSchema,
    onSubmit: (values, formikHelpers) => {
      handleCreateAnswer(values.answer);
      formikHelpers.resetForm();
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (!application) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <CustomButton
        className="back"
        onClick={() => navigate('/admin/basvuru-listesi')}
      >
        Listeleme Ekranına Dön
      </CustomButton>
      <Wrapper className="edit-wrapper">
        <div className="application-info">
          <h2>Başvuru Durumu</h2>
          <SuccessDetail title="basvuru no" value={basvuruNo} />
          <SuccessDetail title="isim" value={application.isim} />
          <SuccessDetail title="soyisim" value={application.soyisim} />
          <SuccessDetail title="yas" value={application.yas} />
          <SuccessDetail title="tc" value={application.tc} />
          <SuccessDetail title="adres" value={application.adres} />
          <SuccessDetail title="basvuru" value={application.basvuru} />
          {application.answers?.map((item) => (
            <SuccessDetail key={item.id} title="Cevap" value={item.answer} />
          ))}
        </div>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              type="text"
              placeholder="Cevap"
              title="Cevap"
              name="answer"
            />

            <label className="select" htmlFor="slct">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="slct"
              >
                <option value="bekliyor">Bekliyor</option>
                <option value="onaylandı">Onaylandı</option>
                <option value="reddedildi">Reddedildi</option>
              </select>
              <svg>
                <use xlinkHref="#select-arrow-down" />
              </svg>
            </label>
            <svg className="sprites">
              <symbol id="select-arrow-down" viewbox="0 0 10 6">
                <polyline points="1 1 5 5 9 1" />
              </symbol>
            </svg>

            <CustomButton type="submit">Başvuruyu Güncelle</CustomButton>
          </form>
        </FormikProvider>
      </Wrapper>
    </div>
  );
}

export default AdminApplicationEditPage;
