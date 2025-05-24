import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { FormAuth, WithLogOutRedirect } from '../../components';
import { login } from '../../redux/auth/operations';
import { useWindowSize } from '../../hooks/useWindowSize';

import css from '../HomePage/HomePage.module.css';

function LoginPage() {
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const onFormSubmit = userData => {
    dispatch(login(userData));
  };
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className={css.title}>
              Welcome Back👋 <br />
              It's great to see you again! Log in to access and manage your
              contacts with ease.
            </h1>
          </div>
        </motion.div>
        <FormAuth isRegisterForm={false} onFormSubmit={onFormSubmit} />
      </div>
      {!isMobile && (
        <motion.div
          className="bg-auth"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      )}
    </section>
  );
}

export default WithLogOutRedirect(LoginPage, '/contacts');
