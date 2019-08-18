import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './LoginForm.module.css';
import { login } from '../../actions/session-actions';

const LoginForm = ({ open }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const usernameInput = useRef(null);
  useEffect(() => {
    if (open) {
      usernameInput.current.focus();
    }
  }, [open, usernameInput]);

  return <form
    className={styles.form}
    onSubmit={(e) => {
      e.preventDefault();
      dispatch(login({ username, password }));
    }}
  >
    <label>username or email<br />
      <input
        type="text"
        className={styles.input}
        ref={usernameInput}
        onChange={(e) => setUsername(e.target.value)}
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
