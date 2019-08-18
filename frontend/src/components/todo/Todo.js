import React from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './Todo.module.css';
import { logout } from '../../actions/session-actions';
import TaskIndex from './TaskIndex';

const Todo = () => {
  const dispatch = useDispatch();

  return <main className={styles.container}>
    <TaskIndex />
    <button onClick={() => dispatch(logout())}>
      Log Out
    </button>
  </main>
};

export default Todo;
