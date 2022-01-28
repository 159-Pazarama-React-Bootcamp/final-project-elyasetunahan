import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import './index.css';
import { collection, getDoc, doc, addDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create } from '../../redux/createApplicationSlice';
import db from '../../firebase';
import createApplicationSchema from '../../validations/Application';
import FormInput from '../../components/Input';
import CustomButton from '../../components/Button';

function CreateApplicationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = async (payload) => {
    const docRef = await addDoc(collection(db, 'applications'), payload);
    const applicationData = await getDoc(doc(db, 'applications', docRef.id));
    if (applicationData.exists()) {
      dispatch(
        create({
          ...applicationData.data(),
          id: applicationData.id,
        })
      );
      navigate('/basvuru-basarili');
    } else {
      alert('Veri çekilirken hata oluştu.');
    }
  };

  const formik = useFormik({
    initialValues: {
      isim: '',
      soyisim: '',
      yas: '',
      tc: '',
      adres: '',
      basvuru: '',
    },
    validationSchema: createApplicationSchema,
    onSubmit: (values) => {
      handleUpload({
        ...values,
        createdAt: new Date().getTime(),
        status: 'bekliyor',
        answers: [],
      });
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className="create-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <h2>Başvuru Oluştur</h2>
          <FormInput
            type="text"
            placeholder="İsminiz"
            title="İsim"
            name="isim"
          />
          <FormInput
            type="text"
            placeholder="Soyisminiz"
            title="Soyisim"
            name="soyisim"
          />
          <FormInput
            type="number"
            placeholder="Yaşınız"
            title="Yaş"
            name="yas"
          />
          <FormInput
            type="string"
            placeholder="Kimlik Numaranız"
            title="TC Kimlik Numarası"
            name="tc"
          />
          <FormInput
            type="textarea"
            placeholder="Adresiniz"
            title="Adresiniz"
            name="adres"
          />
          <FormInput
            type="textarea"
            placeholder="Başvuru Nedeniniz"
            title="Başvuru Nedeniniz"
            name="basvuru"
          />
          <CustomButton type="submit">Gönder</CustomButton>
        </form>
      </div>
    </FormikProvider>
  );
}

export default CreateApplicationPage;
