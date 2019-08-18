import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './SignupForm.module.css';
import { signup } from '../../actions/session-actions';

const LoginForm = ({ open }) => {
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
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
      dispatch(signup({ email, handle, password }));
    }}
  >
    <label>email<br />
      <input
        type="email"
        className={styles.input}
        value={email}
        ref={emailInput}
        onChange={(e) => setEmail(e.target.value)}
      />
    </label>
    <label>handle<br />
      <input
        type="text"
        className={styles.input}
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
    </label>
    <label>password<br />
      <input
        type="password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <input className={styles.submit} type="submit" value="Register" />
  </form>
};

export default LoginForm;
