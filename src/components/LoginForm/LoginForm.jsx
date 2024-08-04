import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { logIn } from '../../redux/auth/operations';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('This field is required'),
  password: Yup.string()
    .min(7, 'Too short! Min 7 symbols')
    .required('This field is required'),
});

function LoginForm() {
  const dispatch = useDispatch();
  const fieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <Form className={css.wrapper}>
        <div className={css.field}>
          <label className={css.label} htmlFor={`${fieldId}-email`}>
            Email
          </label>
          <Field
            type="email"
            name="email"
            placeholder="Your email"
            id={`${fieldId}-email`}
          />
          <ErrorMessage className={css.error} name="email" component="span" />
        </div>
        <div className={css.field}>
          <label className={css.label} htmlFor={`${fieldId}-password`}>
            Password
          </label>
          <Field
            type="password"
            name="password"
            placeholder="Password"
            id={`${fieldId}-password`}
          />
          <ErrorMessage className={css.error} name="password" component="span" />
        </div>
        <button className={css.btn} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
}

export default LoginForm;