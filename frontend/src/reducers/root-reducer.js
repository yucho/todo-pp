import { combineReducers } from 'redux';
import session from './session-api-reducer';
import errors from './errors-reducer';
import users from './users-reducer';
import tasks from './tasks-reducer';

const rootReducer = combineReducers({
  session,
  errors,
  users,
  tasks
});

export default rootReducer;
