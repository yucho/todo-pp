import React from 'react';
import * as styles from './Todo.module.css';
import TaskIndex from './TaskIndex';

const Todo = () => {
  return <main className={styles.container}>
    <TaskIndex />
  </main>
};

export default Todo;
