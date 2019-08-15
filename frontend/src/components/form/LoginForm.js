import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './LoginForm.module.css';
import { login } from '../../actions/session-actions';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
        className={styles.usernameOrEmail}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <label>password<br />
      <input
        type="password"
        className={styles.password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <input type="submit" value="Log In" />
  </form>
};

export default LoginForm;
