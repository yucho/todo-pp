import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './Modal.module.css';

const Modal = (props) => {
  const [modalElement] = useState(() => {
    const root = document.createElement('div');
    root.className = styles.root;
    return root;
  });

  useEffect(() => {
    document.body.appendChild(modalElement);
    return () => document.body.removeChild(modalElement);
  }, [modalElement]);

  return createPortal(<ModalContainer {...props}/>, modalElement);
};

const ModalContainer = ({ open, close, children }) => {
  return <div
    className={`${styles.background}${open ? ` ${styles.open}` : ''}`}
    onClick={() => close()}
  >
    <div
      className={`${styles.container}${open ? ` ${styles.open}` : ''}`}
      onClick={(e) => e.stopPropagation()}
      children={children}
    />
  </div>
};

export default Modal;
