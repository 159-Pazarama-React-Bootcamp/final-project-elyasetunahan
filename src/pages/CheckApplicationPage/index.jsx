import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/Input';
import { checkApplicationSchema } from '../../validations/Application';
import CustomButton from '../../components/Button';

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
      <div className="check-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <h2>Başvuru Sorgulama Ekranı</h2>
          <FormInput
            name="code"
            placeholder="Başvuru Numaranız"
            title="Başvuru Numaranızı Giriniz"
          />
          <CustomButton type="submit">Sorgula</CustomButton>
        </form>
      </div>
    </FormikProvider>
  );
}

export default CheckApplicationPage;
