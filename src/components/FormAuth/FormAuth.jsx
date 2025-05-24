// import { useFormik } from 'formik';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { Spinner } from '../../components';
import { selectIsLoading, selectIsLoggedIn } from '../../redux/selectors';

import css from '../../styles/forms.module.css';

const validationSchema = {
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(7, 'Must be 7 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
};

function RegisterForm({ isRegisterForm = true, onFormSubmit }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
          ...(isRegisterForm && { name: '' }),
        }}
        validationSchema={Yup.object({
          ...validationSchema,
          ...(isRegisterForm && {
            name: Yup.string()
              .trim()
              .min(2, 'Must be 2 characters or more')
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
          }),
        })}
        onSubmit={(values, actions) => {
          onFormSubmit(values);
          actions.resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            {isRegisterForm && (
              <label className={css.label}>
                <Field
                  className={`${css.input} ${
                    errors.name && touched.name && css.input_error
                  }`}
                  type="text"
                  name="name"
                  placeholder="Username"
                />
                <ErrorMessage name="name" />
              </label>
            )}
            <label className={css.label}>
              <Field
                className={`${css.input} ${
                  errors.email && touched.email && css.input_error
                }`}
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage name="email" />
            </label>
            <label className={css.label}>
              <Field
                className={`${css.input} ${
                  errors.password && touched.password && css.input_error
                }`}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" />
            </label>
            <button className={css.button} type="submit" disabled={isLoggedIn}>
              {isLoading ? <Spinner /> : isRegisterForm ? 'Register' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}

export default RegisterForm;
