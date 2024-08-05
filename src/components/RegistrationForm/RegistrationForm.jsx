import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css'; 

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(30, 'Too long. Max 30 symbols')
    .required('This field is required'),
  email: Yup.string()
    .email('must be a valid email')
    .required('This field is required'),
  password: Yup.string()
    .min(7, 'Too short! Min 7 symbols')
    .required('This field is required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.wrapper}>
        <div className={`${css.field} ${css.name}`}>
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <Field
            type="text"
            name="name"
            placeholder="Your name"
            id="name"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.field}>
          <label className={css.label} htmlFor="email">
            Email
          </label>
          <Field
            type="email"
            name="email"
            placeholder="Your email"
            id="email"
          />
          <ErrorMessage className={css.error} name="email" component="span" />
        </div>
        <div className={css.field}>
          <label className={css.label} htmlFor="password">
            Password
          </label>
          <Field
            type="password"
            name="password"
            placeholder="password"
            id="password"
          />
          <ErrorMessage className={css.error} name="password" component="span" />
        </div>
        <button className={css.btn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;