import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './TaskIndex.module.css';
import TaskCreate from '../form/TaskCreate';
import TaskShow from './TaskShow';
import iconSort from './sort.svg';
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
    <table className={styles.table}>
      <thead>
        <tr className={styles.row}>
          <th>
            <SortIcon msg="Sort by status"/>
          </th>
          <th><span>Unfinished Tasks</span></th>
          <th><span>Due </span><SortIcon msg="Sort by due date"/></th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4" className={styles.createContainer}>
            <TaskCreate />
          </td>
        </tr>
        {tasksArr}
      </tbody>
    </table>
  </section>
};

const SortIcon = ({ msg }) => {
  return <img alt={msg} title={msg}
    src={iconSort}
    className={styles.icon}
  />
};

export default TaskIndex;
