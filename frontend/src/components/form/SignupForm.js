import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './SignupForm.module.css';
import { signup, clearErrors } from '../../actions/session-actions';
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

  const ensureArray = (err) => typeof err === 'string' ? [err] : err;
  
  useEffect(() => {
    if (getRemoteErrors && Object.keys(remoteErrors).length > 0) {
      setEmail((state) => ({ ...state, showRemoteErrors: true }));
      setHandle((state) => ({ ...state, showRemoteErrors: true }));
      setPassword((state) => ({ ...state, showRemoteErrors: true }));
      if (remoteErrors.email) setEmail((state) => ({ ...state, remoteErrors: ensureArray(remoteErrors.email) }));
      if (remoteErrors.handle) setHandle((state) => ({ ...state, remoteErrors: ensureArray(remoteErrors.handle) }));
      if (remoteErrors.password) setPassword((state) => ({ ...state, remoteErrors: ensureArray(remoteErrors.password) }));
      setGetRemoteErrors(false);
      dispatch(clearErrors());
    }
  }, [getRemoteErrors, remoteErrors, dispatch]);

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

  const errorMessage = (field) => (isFormActive && (
      (field.remoteErrors.length > 0 && field.showRemoteErrors) ?
        <div className={styles.error}>{field.remoteErrors[0]}</div> :
        (field.localErrors.length > 0 && field.showLocalErrors) ?
          <div className={styles.error}>{field.localErrors[0]}</div> : false
  ));

  return <form
    className={styles.form}
    onSubmit={(e) => {
      e.preventDefault();
      setIsFormActive(true);
      setEmail((state) => ({ ...state, showLocalErrors: true }));
      setHandle((state) => ({ ...state, showLocalErrors: true }));
      setPassword((state) => ({ ...state, showLocalErrors: true }));
      if (validateEmail().length === 0 && validateHandle().length === 0 && validatePassword().length === 0) {
        dispatch(signup({ email: email.value, handle: handle.value, password: password.value }));
        setGetRemoteErrors(true);
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
          setEmail((state) => ({
            ...state, showRemoteErrors: false, remoteErrors: [], value 
          }));
        }}
        onBlur={() => {
          setEmail((state) => ({...state, showLocalErrors: true}));
          validateEmail();
        }}
        remoteErrors={email.remoteErrors}
        localErrors={email.localErrors}
        showLocalErrors={isFormActive && email.showLocalErrors}
        showRemoteErrors={isFormActive && email.showRemoteErrors}
      />
      {errorMessage(email)}
    </label>
    <label>handle<br />
      <InputValidate
        type="text"
        className={styles.input}
        value={handle.value}
        onChange={(e) => {
          const value = e.target.value;
          setHandle((state) => ({
            ...state, showRemoteErrors: false, remoteErrors: [], value
          }));
        }}
        onFocus={() => setIsFormActive(true)}
        onBlur={() => {
          setHandle((state) => ({ ...state, showLocalErrors: true }));
          validateHandle();
        }}
        remoteErrors={handle.remoteErrors}
        localErrors={handle.localErrors}
        showLocalErrors={isFormActive && handle.showLocalErrors}
        showRemoteErrors={isFormActive && handle.showRemoteErrors}
      />
      {errorMessage(handle)}
    </label>
    <label>password<br />
      <InputValidate
        type="password"
        className={styles.input}
        value={password.value}
        onChange={(e) => {
          const value = e.target.value;
          setPassword((state) => ({
            ...state, showRemoteErrors: false, remoteErrors: [], value
          }));
        }}
        onFocus={() => setIsFormActive(true)}
        onBlur={() => {
          setPassword((state) => ({ ...state, showLocalErrors: true }));
          validatePassword();
        }}
        remoteErrors={password.remoteErrors}
        localErrors={password.localErrors}
        showLocalErrors={isFormActive && password.showLocalErrors}
        showRemoteErrors={isFormActive && password.showRemoteErrors}
      />
      {errorMessage(password)}
    </label>
    <input className={styles.submit} type="submit" value="Register" />
  </form>
};

export default LoginForm;
