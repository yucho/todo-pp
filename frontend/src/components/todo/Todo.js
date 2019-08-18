import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/session-actions';
import TaskIndex from './TaskIndex';

const Todo = () => {
  const dispatch = useDispatch();

  return <main>
    <TaskIndex />
    <button onClick={() => dispatch(logout())}>
      Log Out
    </button>
  </main>
};

export default Todo;
