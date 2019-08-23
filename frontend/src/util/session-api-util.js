import axios from 'axios';

export const parseAxiosSuccess = (response) => {
  const { data } = response;
  return data;
};

export const parseAxiosError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return { status: 'error', data: 'Server did not respond' };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { status: 'error', data: error.message };
  }
};

export const parseJSendSuccess = (response) => {
  const { data } = response;
  return data;
};

export const parseJSendError = (error) => {
  const { data } = error;
  return data;
};

export const setAuthToken = (token) => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const signup = (userData) => {
  return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
};
