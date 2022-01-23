import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';
import FormInput from '../../components/Input';

function CreateApplicationPage() {
  const applicationRef = doc(collection(db, 'applications'));

  const handleUpload = async (payload) => {
    const data = await setDoc(applicationRef, payload);
    console.log(data);
  };

  const tcRegExp = /^[1-9]{1}[0-9]{9}[02468]{1}$/;

  const SignupSchema = Yup.object().shape({
    isim: Yup.string()
      .min(2, 'İsminizi Doğru Giriniz')
      .max(50, 'İsminiz 50 karakterden fazla olamaz')
      .required('Bu alanı doldurmanız zorunludur'),
    soyisim: Yup.string()
      .min(2, 'Soyisminizi Doğru Giriniz')
      .max(50, 'Soyisminiz 50 karakterden fazla olamaz')
      .required('Bu alanı doldurmanız zorunludur'),
    yas: Yup.number()
      .max(120, 'Lütfen Gerçek Yaşınızı Giriniz')
      .positive('Yaşınız pozitif değere sahip olmalıdır')
      .required('Bu alanı doldurmanız zorunludur'),
    tc: Yup.string()
      .matches(tcRegExp, 'Kimlik Numarası Geçersiz')
      .required('Bu alanı doldurmanız zorunludur'),
    adres: Yup.string()
      .min(12, 'Lütfen Adresinizi Doğru Giriniz')
      .required('Bu alanı doldurmanız zorunludur'),
    basvuru: Yup.string()
      .min(10, 'Lütfen Basvurunuzu Doğru Açıklayınız')
      .required('Bu alanı doldurmanız zorunludur'),
  });

  const formik = useFormik({
    initialValues: {
      isim: '',
      soyisim: '',
      yas: '',
      tc: '',
      adres: '',
      basvuru: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleUpload(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Başvuru Oluştur</h2>
        <FormInput type="text" placeholder="İsminiz" title="İsim" name="isim" />
        <FormInput
          type="text"
          placeholder="Soyisminiz"
          title="Soyisim"
          name="soyisim"
        />
        <FormInput type="number" placeholder="Yaşınız" title="Yaş" name="yas" />
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
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </FormikProvider>
  );
}

export default CreateApplicationPage;
