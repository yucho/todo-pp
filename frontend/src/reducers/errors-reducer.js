import { combineReducers } from 'redux';

import SessionErrorsReducer from './session-errors-reducer';
import TasksErrorsReducer from './tasks-errors-reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  tasks: TasksErrorsReducer
});
