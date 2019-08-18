import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './TaskIndex.module.css';
import TaskCreate from '../form/TaskCreate';
import TaskShow from './TaskShow';
import { fetchTasks } from '../../actions/tasks-actions';

const TaskIndex = () => {
  const tasks = useSelector((state) => state.tasks);
  const tasksArr = Object.keys(tasks)
    .map((_id) => {
      return <TaskShow key={_id} task={tasks[_id]} />;
    });
    // .sort()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  return <section>
    <table className={styles.header}>
      <tbody>
        <tr className={styles.row}>
          <th>Done</th>
          <th>Task</th>
          <th>Due</th>
          <th />
        </tr>
      </tbody>
    </table>
    <TaskCreate />
    <table className={styles.table}>
      <tbody>
        
        {tasksArr}
      </tbody>
    </table>
  </section>
};

export default TaskIndex;
