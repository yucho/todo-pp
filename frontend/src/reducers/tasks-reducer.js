import {
  RECEIVE_TASKS,
  RECEIVE_TASK,
  REMOVE_TASK
} from '../actions/tasks-actions';

const tasksReducer = (prevState = {}, action) => {
  let newState = {};
  switch(action.type) {
    case RECEIVE_TASKS:
      const _ids = Object.keys(action.tasks);
      for (const _id of _ids) {
        newState[_id] = action.tasks[_id];
      }
      return Object.assign({}, prevState, newState);
    case RECEIVE_TASK:
      const { _id } = action.task;
      return Object.assign({}, prevState, { [_id]: action.task });
    case REMOVE_TASK:
      newState = Object.assign({}, prevState);
      delete newState[action.id];
      return newState;
    default:
      return prevState;
  }
};

export default tasksReducer;
