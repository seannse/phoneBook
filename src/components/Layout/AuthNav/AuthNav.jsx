import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

function AuthNav() {
  return (
    <nav>
      <ul className={css.list}>
        <li>
          <NavLink className={css.link} to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className={css.link} to="/register">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
