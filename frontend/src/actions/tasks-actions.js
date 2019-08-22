import axios from 'axios';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const RECEIVE_TASKS_ERRORS = 'RECEIVE_TASKS_ERRORS';

export const fetchTasks = () => (dispatch) => {
  return axios.get('/api/tasks')
    .then(({ data }) => dispatch(receiveTasks(data.data)))
    .catch((err) => dispatch(receiveErrors(err)));
};

export const createTask = (taskData) => (dispatch) => {
  return axios.post('/api/tasks', taskData)
    .then(({ data }) => dispatch(receiveTask(data.data)))
    .catch((err) => dispatch(receiveErrors(err.response.data.data)));
};

export const updateTask = (taskData) => (dispatch) => {
  const { _id, ...data } = taskData;
  return axios.patch(`/api/tasks/${_id}`, data)
    .then(({ data }) => dispatch(receiveTask(data.data)))
    .catch((err) => dispatch(receiveErrors(err.response.data.data)));
};

export const deleteTask = (_id) => (dispatch) => {
  return axios.delete(`/api/tasks/${_id}`)
    .then(() => dispatch(removeTask(_id)))
    .catch((err) => dispatch(receiveErrors(err.response.data.data)));
};

export const receiveTasks = (tasks) => ({
  type: RECEIVE_TASKS,
  tasks
});

export const receiveTask = (task) => ({
  type: RECEIVE_TASK,
  task
});

export const removeTask = (_id) => ({
  type: REMOVE_TASK,
  _id
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_TASKS_ERRORS,
  errors
});
