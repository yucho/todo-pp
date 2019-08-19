import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.unshift(logger);
}

const configureStore = (preloadedState = {}) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(...middleware)
);

export default configureStore;
