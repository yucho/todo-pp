import {
  RECEIVE_TASKS_ERRORS,
  RECEIVE_TASKS,
  RECEIVE_TASK,
  REMOVE_TASK
} from '../actions/tasks-actions';

const _nullErrors = [];

const TasksErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TASKS_ERRORS:
      return action.errors;
    case RECEIVE_TASKS:
    case RECEIVE_TASK:
    case REMOVE_TASK:
      return _nullErrors;
    default:
      return state;
  }
};

export default TasksErrorsReducer;
