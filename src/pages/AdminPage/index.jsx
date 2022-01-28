import { collection, getDocs } from 'firebase/firestore';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from '../../components/Input';
import db from '../../firebase';
import loginSchema from '../../validations/Admin';
import { setLoggedIn } from '../../redux/adminSlice';
import CustomButton from '../../components/Button';

function AdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (payload) => {
    const querySnapshot = await getDocs(collection(db, 'admin'));
    querySnapshot.forEach((doc) => {
      if (doc.data().username === payload.username) {
        if (doc.data().password === payload.password) {
          localStorage.setItem('username', payload.username);
          localStorage.setItem('password', payload.password);
          dispatch(setLoggedIn(true));
          navigate('/admin/basvuru-listesi');
        } else alert('Girdiğiniz Şifre Doğru değildir');
      } else alert('Kullanıcı Bilgilerinizi Kontrol ediniz');
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <FormikProvider value={formik}>
      <div className="form-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            name="username"
            placeholder="Kullanıcı Adınız"
            title="Kullanıcı Adınız"
          />

          <FormInput
            type="password"
            name="password"
            placeholder="Şifre"
            title="Şifreniz"
          />
          <CustomButton type="submit">Giriş Yap</CustomButton>
        </form>
      </div>
    </FormikProvider>
  );
}

export default AdminPage;
