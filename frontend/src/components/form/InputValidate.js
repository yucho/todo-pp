import React, { forwardRef } from 'react';
import * as styles from './InputValidate.module.css';

// validators are function(s) that get run against input value, and returning
// non-empty string will set local errors
//
// setLocalErrors is setter function passed from parent (who keeps error state)
//
// remoteErrors are parsed by and passed down from parent
//
const InputValidate = forwardRef(({
  showLocalErrors,
  showRemoteErrors,
  localErrors = [],
  remoteErrors = [],
  className = styles.input,
  errorClassName = styles.error,
  ...props
}, ref) => {
  const errors = localErrors.concat(remoteErrors);
  const combinedClassName =  errors.length > 0 ?
    `${className} ${errorClassName}` :
    className;

  return <input
    ref={ref}
    className={combinedClassName}
    {...props}
  />
});

export const validate = (value, validators, setLocalErrors) => () => {
  if (typeof validators === 'function') {
    validators = [validators];
  }
  const errors = [];
  for (const check of validators) {
    const message = check(value);
    if (!!message) {
      errors.push(message);
    }
  }
  setLocalErrors(errors);
  return errors;
};

export default InputValidate;
