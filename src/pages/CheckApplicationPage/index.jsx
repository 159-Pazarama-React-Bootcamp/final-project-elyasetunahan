import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/Button';
import FormInput from '../../components/Input';
import Wrapper from '../../components/Wrapper';
import { checkApplicationSchema } from '../../validations/Application';
import './index.css';

function CheckApplicationPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: checkApplicationSchema,
    onSubmit: (values) => navigate(`/basvuru/${values.code}`),
  });

  return (
    <FormikProvider value={formik}>
      <Wrapper>
        <form onSubmit={formik.handleSubmit}>
          <h2>Başvuru Sorgulama Ekranı</h2>
          <FormInput
            name="code"
            placeholder="Başvuru Numaranız"
            title="Başvuru Numaranızı Giriniz"
          />
          <CustomButton type="submit">Sorgula</CustomButton>
        </form>
      </Wrapper>
    </FormikProvider>
  );
}

export default CheckApplicationPage;
