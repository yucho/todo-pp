import React, { useState } from 'react';
import * as styles from './InputValidate.module.css';

// validators are function(s) that get run against input value, and returning
// non-empty string will set local errors
//
// setLocalErrors is setter function passed from parent (who keeps error state)
//
// remoteErrors are parsed by and passed down from parent
//
const InputValidate = ({
  validators = () => '',
  setLocalErrors = () => {},
  remoteErrors = null,
  className = styles.input,
  errorClassName = styles.error,
  ...props
}) => {
  if (typeof validators === 'function') {
    validators = [validators];
  }

  const [value, setValue] = useState('');
  const [errors, setErrors] = useState([]);

  const combinedClassName =  errors.length > 0 ?
    `${className} ${errorClassName}` :
    className;

  
  
  return <input
    className={combinedClassName}
    onChange={(e) => setValue(e.target.value)}
    onBlur={() => {
      const errors = [];
      for (const check of validators) {
        const message = check(value);
        if (!!message) {
          errors.push(message);
        }
      }
      setLocalErrors(errors);
      setErrors(errors);
    }}
    {...props}
  />
};

export default InputValidate;
