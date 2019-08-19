import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './LoginForm.module.css';
import { login } from '../../actions/session-actions';

const LoginForm = ({ open }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const emailInput = useRef(null);
  useEffect(() => {
    if (open) {
      emailInput.current.focus();
    }
  }, [open, emailInput]);

  return <form
    className={styles.form}
    onSubmit={(e) => {
      e.preventDefault();
      dispatch(login({ email, password }));
    }}
  >
    <label>email<br />
      <input
        type="text"
        className={styles.input}
        ref={emailInput}
        onChange={(e) => setEmail(e.target.value)}
      />
    </label>
    <label>password<br />
      <input
        type="password"
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <input type="submit" className={styles.submit} value="Log In" />
  </form>
};

export default LoginForm;
