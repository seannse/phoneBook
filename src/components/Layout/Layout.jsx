import { Suspense, useEffect } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';
import { motion } from 'framer-motion';

import {
  selectError,
  selectIsLoggedIn,
  selectTheme,
  selectToken,
} from '../../redux/selectors';
import { getCurrentUser } from '../../redux/auth/operations';
import { Loader, ThemeSwitcher } from '../../components';
import UserMenu from './UserMenu/UserMenu';
import AuthNav from './AuthNav/AuthNav';

import logo from '../../images/logo.png';
import css from './Layout.module.css';

function Layout() {
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  // const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (!error) return;
    Notify.failure('Something went wrong 😪. Please try again later.', {
      clickToClose: true,
      timeout: 3000,
      position: 'center-top',
    });
  }, [error]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (!token) return;
    dispatch(getCurrentUser());
  }, [dispatch, token]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <header className={css.header}>
          <div className={css.header_container}>
            <Link style={{ flexGrow: 100 }} to="/">
              <img src={logo} alt="logo" width={120} height={50} />
            </Link>

            {isLoggedIn ? <UserMenu /> : <AuthNav />}

            <ThemeSwitcher />
          </div>
        </header>
      </motion.div>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

export default Layout;
