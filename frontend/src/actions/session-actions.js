import jwt_decode from 'jwt-decode';
import * as APIUtil from '../util/session-api-util';
const {
  parseAxiosSuccess, parseAxiosError, parseJSendSuccess, parseJSendError
} = APIUtil;

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearErrors = (errors) => ({
  type: CLEAR_SESSION_ERRORS
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const signup = (user) => (dispatch) => (
  APIUtil.signup(user)
    .then(() => dispatch(login(user)))
    .catch((err) => (
      dispatch(receiveErrors(parseJSendError(parseAxiosError(err))))
    ))
);

export const login = (user) => (dispatch) => (
  APIUtil.login(user).then(res => {
    const { token } = parseJSendSuccess(parseAxiosSuccess(res));
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded))
  })
    .catch((err) => {
      dispatch(receiveErrors(parseJSendError(parseAxiosError(err))));
    })
);

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  APIUtil.setAuthToken(false)
  dispatch(logoutUser());
};
