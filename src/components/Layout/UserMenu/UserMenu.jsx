import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SlLogout } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';

import { logout } from '../../../redux/auth/operations';
import { selectUser } from '../../../redux/selectors';
import { useWindowSize } from '../../../hooks/useWindowSize';

import css from './UserMenu.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';

function UserMenu() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const { isMobile } = useWindowSize();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuClick = () => setShowMobileMenu(p => !p);

  return (
    <>
      {isMobile ? (
        <button onClick={handleMenuClick}>
          <RxHamburgerMenu style={{ width: 28, height: 28, padding: 0 }} />
        </button>
      ) : (
        <div className={css.wrapper}>
          <NavLink className={css.link} to="/contacts">
            My contacts
          </NavLink>
          <span className={css.user}>👋🏻 Welcome, {userInfo.name}</span>
          <button className={css.button} type="button" onClick={handleLogout}>
            <SlLogout /> log out
          </button>
        </div>
      )}

      {isMobile && showMobileMenu && (
        <div className={css.mobile_menu}>
          <button onClick={handleMenuClick}>X</button>
          <NavLink className={css.link} to="/contacts">
            My contacts
          </NavLink>
          <span className={css.user}>👋🏻 Welcome, {userInfo.name}</span>
          <button className={css.button} type="button" onClick={handleLogout}>
            <SlLogout /> log out
          </button>
        </div>
      )}
    </>
  );
}

export default UserMenu;
