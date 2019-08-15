import React from 'react';
import { useSelector } from 'react-redux';
import * as styles from './Header.module.css';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  return <header
    className={`${styles.header}${isAuthenticated ? ` ${styles.loggedIn}` : ''}`}
  >
    <h1>todo++</h1>
    {!isAuthenticated &&
      <p>
        Your average to-do app, but ever so slightly better. <br />
        <span className={styles.small}>It's free and always will be.</span>
      </p>
    }
  </header>
};

export default Header;
