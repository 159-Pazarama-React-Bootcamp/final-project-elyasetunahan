import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Kullanıcı adınızı doldurmanız zorunludur'),
  password: Yup.string().required('Şifre alanını doldurmanız zorunludur'),
});

export default loginSchema;
