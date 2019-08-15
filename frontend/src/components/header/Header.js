import React from 'react';
import * as styles from './Header.module.css';

const Header = () => {
  return <header className={styles.header}>
    <h1>todo++</h1>
    <p>
      Your average to-do app, but ever so slightly better. <br />
      <span className={styles.small}>It's free and always will be.</span>
    </p>
  </header>
};

export default Header;
