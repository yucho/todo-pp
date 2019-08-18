import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './TaskIndex.module.css';
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
