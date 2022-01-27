import * as Yup from 'yup';

const tcRegExp = /^[1-9]{1}[0-9]{9}[02468]{1}$/;

const createApplicationSchema = Yup.object().shape({
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

export default createApplicationSchema;
