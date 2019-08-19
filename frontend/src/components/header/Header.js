import React from 'react';
import { useSelector } from 'react-redux';
import * as styles from './Header.module.css';
import Menu from './Menu';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  return <header
    className={`${styles.header}${isAuthenticated ? ` ${styles.loggedIn}` : ''}`}
  >
    <div className={styles.container}>
      <h1>todo++</h1>
      {!isAuthenticated &&
        <p>
          Your average to-do app, but ever so slightly better. <br />
          <span className={styles.small}>It's free and always will be.</span>
        </p>
      }
      {isAuthenticated &&
        <Menu />
      }
    </div>
  </header>
};

export default Header;
