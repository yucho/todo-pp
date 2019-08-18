import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './SplashNav.module.css';
import Modal from '../modal/Modal';
import SignupForm from '../form/SignupForm';
import LoginForm from '../form/LoginForm'
import { login } from '../../actions/session-actions';

const SplashNav = () => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const dispatch = useDispatch();

  return <main className={styles.container}>
    <ul className={styles.menu}>
      <li>
        <p>New user?</p>
        <button className={styles.register}
          onClick={() => setSignupModalOpen(true)}
        >
          Register
        </button>
        <Modal
          open={signupModalOpen}
          close={() => setSignupModalOpen(false)}
        >
          <SignupForm open={signupModalOpen} />
        </Modal>
      </li>
      <li>
        <p>Already have an account?</p>
        <button
          className={styles.login}
          onClick={() => setLoginModalOpen(true)}
        >
          Login
        </button>
        <Modal
          open={loginModalOpen}
          close={() => setLoginModalOpen(false)}
        >
          <LoginForm open={loginModalOpen} />
        </Modal>
      </li>
      <li>
        <p>Just wanna give it a try?</p>
        <button
          className={styles.demo}
          onClick={() => dispatch(login({
            username: 'demo@example.com', password: 'hunter12'
          }))}
        >
          Demo
        </button>
      </li>
    </ul>
  </main>
};

export default SplashNav;
