import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './SignupForm.module.css';
import { signup } from '../../actions/session-actions';
import InputValidate, { validate } from './InputValidate';

const LoginForm = ({ open }) => {
  const [email, setEmail] = useState({
    value: '',
    localErrors: [],
    remoteErrors: [],
    showLocalErrors: false,
    showRemoteErrors: false
  });
  const [handle, setHandle] = useState({
    value: '',
    localErrors: [],
    remoteErrors: [],
    showLocalErrors: false,
    showRemoteErrors: false
  });
  const [password, setPassword] = useState({
    value: '',
    localErrors: [],
    remoteErrors: [],
    showLocalErrors: false,
    showRemoteErrors: false
  });

  // Flag is set when you think user is interested enough in the form (so we
  // can start validating input values)
  const [isFormActive, setIsFormActive] = useState(false);

  // Only get remote errors once after the submit
  const [getRemoteErrors, setGetRemoteErrors] = useState(false);

  const remoteErrors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const emailInput = useRef(null);

  useEffect(() => {
    if (open) {
      emailInput.current.focus();
    }
  }, [open, emailInput]);

  useEffect(() => {
    if (getRemoteErrors && remoteErrors.length > 0) {
      setEmail((state) => ({ ...state, showRemoteErrors: true }));
      setHandle((state) => ({ ...state, showRemoteErrors: true }));
      setPassword((state) => ({ ...state, showRemoteErrors: true }));
      if (remoteErrors.email) setEmail((state) => ({ ...state, remoteErrors: remoteErrors.email}));
      if (remoteErrors.handle) setHandle((state) => ({ ...state, remoteErrors: remoteErrors.handle }));
      if (remoteErrors.password) setPassword((state) => ({ ...state, remoteErrors: remoteErrors.password }));
      setGetRemoteErrors(false);
    }
  }, [getRemoteErrors, remoteErrors]);

  const validateEmail = validate(
    email.value,
    (text) => text.length > 0 ? '' : 'Must provide email',
    (err) => setEmail((state) => ({...state, localErrors: err}))
  );
  const validateHandle = validate(
    handle.value,
    (text) => text.length > 0 ? '' : 'Must provide handle',
    (err) => setHandle((state) => ({ ...state, localErrors: err }))
  );
  const validatePassword = validate(
    password.value,
    (text) => text.length > 0 ? '' : 'Must provide password',
    (err) => setPassword((state) => ({ ...state, localErrors: err }))
  );

  return <form
    className={styles.form}
    onSubmit={(e) => {
      e.preventDefault();
      setIsFormActive(true);
      setEmail((state) => ({ ...state, showLocalErrors: true }));
      setHandle((state) => ({ ...state, showLocalErrors: true }));
      setPassword((state) => ({ ...state, showLocalErrors: true }));
      if (validateEmail().length === 0 && validateHandle().length === 0 && validatePassword().length === 0) {
        setGetRemoteErrors(true);
        dispatch(signup({ email: email.value, handle: handle.value, password: password.value }));
      }
    }}
  >
    <label>email<br />
      <InputValidate
        type="email"
        className={styles.input}
        value={email.value}
        ref={emailInput}
        onChange={(e) => {
          setIsFormActive(true);
          const value = e.target.value;
          setEmail((state) => ({ ...state, showRemoteErrors: false, value }));
        }}
        onBlur={() => {
          setEmail((state) => ({...state, showLocalErrors: true}));
          validateEmail();
        }}
        remoteErrors={remoteErrors.email}
        showLocalErrors={isFormActive && email.showLocalErrors}
        showRemoteErrors={isFormActive && email.showRemoteErrors}
      />
      { isFormActive && (
        (email.remoteErrors.length > 0) ?
          <div className={styles.error}>{email.remoteErrors[0]}</div> :
          (email.localErrors.length > 0) ?
          <div className={styles.error}>{email.localErrors[0]}</div> : false
      )}
    </label>
    <label>handle<br />
      <InputValidate
        type="text"
        className={styles.input}
        value={handle.value}
        onChange={(e) => {
          const value = e.target.value;
          setHandle((state) => ({ ...state, showRemoteErrors: false, value }));
        }}
        onFocus={() => setIsFormActive(true)}
        onBlur={() => {
          setHandle((state) => ({ ...state, showLocalErrors: true }));
          validateHandle();
        }}
        remoteErrors={remoteErrors.handle}
        showLocalErrors={isFormActive && handle.showLocalErrors}
        showRemoteErrors={isFormActive && handle.showRemoteErrors}
      />
      { isFormActive && (
        (handle.remoteErrors.length > 0) ?
          <div className={styles.error}>{handle.remoteErrors[0]}</div> :
          (handle.localErrors.length > 0) ?
          <div className={styles.error}>{handle.localErrors[0]}</div> : false
      )}
    </label>
    <label>password<br />
      <InputValidate
        type="password"
        className={styles.input}
        value={password.value}
        onChange={(e) => {
          const value = e.target.value;
          setPassword((state) => ({ ...state, showRemoteErrors: false, value }));
        }}
        onFocus={() => setIsFormActive(true)}
        onBlur={() => {
          setPassword((state) => ({ ...state, showLocalErrors: true }));
          validatePassword();
        }}
        remoteErrors={remoteErrors.password}
        showLocalErrors={isFormActive && password.showLocalErrors}
        showRemoteErrors={isFormActive && password.showRemoteErrors}
      />
      { isFormActive && (
        (password.remoteErrors.length > 0) ?
          <div className={styles.error}>{password.remoteErrors[0]}</div> :
          (password.localErrors.length > 0) ?
          <div className={styles.error}>{password.localErrors[0]}</div> : false  
      )}
    </label>
    <input className={styles.submit} type="submit" value="Register" />
  </form>
};

export default LoginForm;
