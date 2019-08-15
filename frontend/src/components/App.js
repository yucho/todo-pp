import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import configureStore from '../store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../util/session-api-util';
import { logout } from '../actions/session-actions';
import Header from './header/Header';
import SplashNav from './splash/SplashNav';
import Todo from './todo/Todo';

const App = () => {
  const isAuthenticated = useSelector((state) => state.session.isAuthenticated);

  return (
    <div className="App">
      <Header />
      {isAuthenticated ? <Todo /> : <SplashNav />}
    </div>
  );
};

const Root = ({ children }) => {
  let store;
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      // window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
