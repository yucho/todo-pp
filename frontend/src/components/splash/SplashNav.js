import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './SplashNav.module.css';
import Modal from '../modal/Modal';
import LoginForm from '../form/LoginForm'
import { login } from '../../actions/session-actions';

const SplashNav = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const dispatch = useDispatch();

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
        <button
          className={styles.button}
          onClick={() => dispatch(login({ username: 'demo@example.com', password: 'hunter12' }))}
        >
          Demo
        </button>
      </li>
    </ul>
  </main>
};

export default SplashNav;
