import React from 'react';
import passportLogo from '../../images/passportLogo.png';

import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

import * as ROUTES from '../../routes';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={passportLogo} alt="Logo" />
        </div>
        <div>
          <h8 className={styles.logoText}>Pass Pall</h8>
        </div>
        <ul className={styles.menu}>
          <li>
            <NavLink activeClassName={styles.active} to={ROUTES.EXPLORE}>
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to={ROUTES.COMPARE}>
              Compare
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to={ROUTES.RANK}>
              Rank
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
