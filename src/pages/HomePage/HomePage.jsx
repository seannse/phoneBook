import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import { selectIsLoggedIn, selectUser } from '../../redux/selectors';
import css from './HomePage.module.css';

function HomePage() {
  const isloggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <section className="section">
      <div className="container" style={{ minHeight: 502 }}>
        {isloggedIn ? (
          <motion.div
            className={css.wrapper}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={css.title}>
              Welcome to the Phonebook App. Manage your contacts easily and
              efficiently.
            </h1>
            <p className={css.text}>
              {user?.name}, we are happy to announce that you have access to all
              the features of the contact book!
            </p>
          </motion.div>
        ) : (
          <motion.div
            className={css.wrapper}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={css.title}>
              To access all features,{' '}
              <NavLink className={css.link} to="/register">
                register{' '}
              </NavLink>
              or{' '}
              <NavLink className={css.link} to="/login">
                log in
              </NavLink>
            </h1>
          </motion.div>
        )}
        <motion.div
          className={css.bg_home}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    </section>
  );
}

export default HomePage;
