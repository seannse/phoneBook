import { useDispatch } from 'react-redux';
import { FormAuth, WithLogOutRedirect } from '../../components';
import { register } from '../../redux/auth/operations';
import { useWindowSize } from '../../hooks/useWindowSize';
import { motion } from 'framer-motion';
import css from '../HomePage/HomePage.module.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const onFormSubmit = userData => {
    dispatch(register(userData));
  };

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={css.title}>
            Welcome 👋 <br />
            Today is a new day. It's your day. You shape it. Register to start
            managing your contacts.
          </h1>
        </motion.div>
        <FormAuth onFormSubmit={onFormSubmit} />
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

export default WithLogOutRedirect(RegisterPage, '/contacts');
