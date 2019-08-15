import React, { useState } from 'react';
import * as styles from './SplashNav.module.css';
import Modal from '../modal/Modal';
import LoginForm from '../form/LoginForm'

const SplashNav = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return <main className={styles.container}>
    <ul className={styles.menu}>
      <li>
        <p>New user?</p>
        <button className={styles.button}>Register</button>
      </li>
      <li>
        <p>Already have an account?</p>
        <button
          className={styles.button}
          onClick={() => setLoginModalOpen(true)}
        >
          Login
                  </button>
        <Modal
          open={loginModalOpen}
          close={() => setLoginModalOpen(false)}
        >
          <LoginForm />
        </Modal>
      </li>
      <li>
        <p>Just wanna give it a try?</p>
        <button className={styles.button}>Demo</button>
      </li>
    </ul>
  </main>
};

export default SplashNav;
