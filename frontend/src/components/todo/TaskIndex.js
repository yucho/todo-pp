import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as styles from './TaskIndex.module.css';
import iconEdit from './edit.svg';
import iconDelete from './delete.svg';
import { fetchTasks } from '../../actions/tasks-actions';

const TaskIndex = () => {
  const tasks = useSelector((state) => state.tasks);
  const tasksArr = Object.keys(tasks)
    .map((_id) => {
      const { body, due } = tasks[_id];
      const iconStyle = { width: '16px', height: '16px' };
      return <tr key={_id} className={styles.row}>
        <td><input type="checkbox" /></td>
        <td>{body}</td>
        <td>{due && moment(due).format('Y/M/D')}</td>
        <td>
          <img style={iconStyle} alt="Edit task" src={iconEdit} />
          <img style={iconStyle} alt="Delete task" src={iconDelete} />
        </td>
      </tr>
    });
    // .sort()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  return <section>
    <table className={styles.table}>
      <tbody>
        <tr className={styles.row}>
          <th>Done</th>
          <th>Task</th>
          <th>Due</th>
          <th />
        </tr>
        {tasksArr}
      </tbody>
    </table>
  </section>
};

export default TaskIndex;
