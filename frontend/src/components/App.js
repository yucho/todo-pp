import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import * as styles from './App.module.css';
import configureStore from '../store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../util/session-api-util';
import { logout } from '../actions/session-actions';

const App = () => {
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
        <div className="App">
          <header className={styles.header}>
            <h1>todo++</h1>
            <p>
              Your average to-do app, but ever so slightly better. <br />
              <span className={styles.small}>It's free and always will be.</span>
            </p>
          </header>
          <main className={styles.container}>
            <ul className={styles.menu}>
              <li>
                <p>New user?</p>
                <button className={styles.button}>Register</button>
              </li>
              <li>
                <p>Already have an account?</p>
                <button className={styles.button}>Login</button>
              </li>
              <li>
                <p>Just wanna give it a try?</p>
                <button className={styles.button}>Demo</button>
              </li>
            </ul>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;