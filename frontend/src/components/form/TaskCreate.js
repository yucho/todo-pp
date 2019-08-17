import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import InputValidate from './InputValidate';
import { createTask } from "../../actions/tasks-actions";

const TaskCreate = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
  const [due, setDue] = useState(null);

  return <form onSubmit={(e) => {
      e.preventDefault();
      dispatch(createTask({ body, due }));
    }}>
    <InputValidate type="text" value={body} onChange={(e) => setBody(e.target.value)} />
    <InputValidate type="date" value={due} onChange={(e) => setDue(e.target.value)} />
    <input type="submit" value="Create Task" />
  </form>
};

export default TaskCreate;
