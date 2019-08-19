import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styles from './TaskIndex.module.css';
import TaskCreate from '../form/TaskCreate';
import TaskShow from './TaskShow';
import iconSort from './sort.svg';
import { fetchTasks } from '../../actions/tasks-actions';

const TaskIndex = () => {
  const [order, setOrder] = useState([
    ['timestamp', 'desc'],
    ['due', '']
  ]);
  const [filter, setFilter] = useState('open');
  const tasks = useSelector((state) => state.tasks);
  const tasksArr = Object.keys(tasks)
    .map((_id) => tasks[_id])
    .filter((task) => task.status === filter)
    .sort((a, b) => compareFunctions[order[0][0]](a, b, order[0][1]))
    .sort((a, b) => compareFunctions[order[1][0]](a, b, order[1][1]))
    .map((task) => {
      return <TaskShow key={task._id} task={task} />;
    });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const sortByStatus = () => setFilter((state) => state === 'open' ? 'done' : 'open');
  const sortByDueDate = () => setOrder((order) => {
    const newOrder = order.slice();
    const old = order[1][1];
    if (old === '') {
      newOrder[1][1] = 'desc';
    } else if (old === 'desc') {
      newOrder[1][1] = 'asc';
    } else {
      newOrder[1][1] = '';
    }
    return newOrder;
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      setFilter('open');
    }
  }, [open]);
 
  return <section>
    <table className={styles.table}>
      <thead>
        <tr className={styles.row}>
          <th>
            <SortIcon msg="Sort by status" onClick={sortByStatus}/>
          </th>
          <th>
            <span className={styles.toggle} onClick={sortByStatus}>
              {filter === 'open' ? 'Unfinished Tasks' : 'Finished Tasks'}
            </span>
          </th>
          <th>
            <SortIcon msg="Sort by due date" onClick={sortByDueDate} />
            <span className={styles.toggle} onClick={sortByDueDate}> Due</span>
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4" className={styles.createContainer}>
            <TaskCreate open={open} setOpen={setOpen} />
          </td>
        </tr>
        {tasksArr}
      </tbody>
    </table>
  </section>
};

const SortIcon = ({ msg, ...props }) => {
  return <img alt={msg} title={msg} src={iconSort} className={styles.icon} {...props} />
};

const timestamp = (_id) => parseInt(_id.toString().substring(0, 8), 16);

const compareFunctions = {
  timestamp: (a, b, order) => {
    const a_id = timestamp(a._id);
    const b_id = timestamp(b._id);
    return order === 'asc' ? a_id - b_id : b_id - a_id;
  },
  due: (a, b, order) => {
    if (!order) {
      return 0;
    } else if (order === 'asc') {
      return new Date(a.due) - new Date(b.due);
    } else {
      return new Date(b.due) - new Date(a.due);
    }
  }
};

export default TaskIndex;
