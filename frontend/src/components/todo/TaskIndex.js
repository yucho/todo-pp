import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './TaskIndex.module.css';
import { fetchTasks } from '../../actions/tasks-actions';

const TaskIndex = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const tasks = useSelector((state) => state.tasks);
  const tasksArr = Object.keys(tasks)
    .map((_id) => {
      const { body, due } = tasks[_id];
      return <tr key={_id} className={styles.row}>
        <td><input type="checkbox" /></td>
        <td>{body}</td>
        <td>{due}</td>
      </tr>
    });
    // .sort()
  
  return <section>
    <table className={styles.table}>
      <tbody>
        <tr className={styles.row}>
          <th>Done</th>
          <th>Task</th>
          <th>Due</th>
        </tr>
        {tasksArr}
      </tbody>
    </table>
  </section>
};

export default TaskIndex;
