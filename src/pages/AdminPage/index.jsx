import { collection, getDocs } from 'firebase/firestore';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/Button';
import FormInput from '../../components/Input';
import Wrapper from '../../components/Wrapper';
import db from '../../firebase';
import { setLoggedIn } from '../../redux/adminSlice';
import loginSchema from '../../validations/Admin';

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
      }
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
      <Wrapper>
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
      </Wrapper>
    </FormikProvider>
  );
}

export default AdminPage;
