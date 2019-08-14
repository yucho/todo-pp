import React from 'react';
import * as styles from './Modal.module.css';

const Modal = ({ open, close, ...props }) => {
  return <div
    className={`${styles.container}${open ? ` ${styles.open}` : ''}`}
    onClick={() => close()}
    {...props}
  />
};

export default Modal;
