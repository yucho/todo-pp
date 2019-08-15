import React from 'react';
import InputValidate from './InputValidate';

const TaskCreate = () => {
  return <form>
    <InputValidate type="text" />
    <input type="submit" value="Create Task" />
  </form>
};

export default TaskCreate;
