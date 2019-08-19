import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './SignupForm.module.css';
import { signup } from '../../actions/session-actions';
import InputValidate from './InputValidate';

const LoginForm = ({ open }) => {
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [handleErrors, setHandleErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
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
      <InputValidate
        type="email"
        className={styles.input}
        value={email}
        ref={emailInput}
        onChange={(e) => setEmail(e.target.value)}
        validators={(text) => text.length > 0 ? '' : 'Must provide email'}
        setLocalErrors={setEmailErrors}
      />
      {emailErrors.length > 0 && <div className={styles.error}>{emailErrors[0]}</div>}
    </label>
    <label>handle<br />
      <InputValidate
        type="text"
        className={styles.input}
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        validators={(text) => text.length > 0 ? '' : 'Must provide handle'}
        setLocalErrors={setHandleErrors}
      />
      {handleErrors.length > 0 && <div className={styles.error}>{handleErrors[0]}</div>}
    </label>
    <label>password<br />
      <InputValidate
        type="password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        validators={(text) => text.length > 0 ? '' : 'Must provide password'}
        setLocalErrors={setPasswordErrors}
      />
      {passwordErrors.length > 0 && <div className={styles.error}>{passwordErrors[0]}</div>}
    </label>
    <input className={styles.submit} type="submit" value="Register" />
  </form>
};

export default LoginForm;
