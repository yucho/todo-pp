import React from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './TaskDelete.module.css';
import Modal from '../modal/Modal';
import { deleteTask } from '../../actions/tasks-actions';

const TaskDelete = ({_id, body, open, close}) => {
  const dispatch = useDispatch();

  return <Modal open={open} close={close}>
    <section className={styles.container}>
      <div className={styles.message}>Delete "{body}"?</div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(deleteTask(_id));
            close();
          }}
        >
          Delete
        </button>
        <button
          className={`${styles.button} ${styles.cancel}`}
          onClick={close}
        >
          Cancel
        </button>
      </div>
    </section>
  </Modal>
};

export default TaskDelete;
