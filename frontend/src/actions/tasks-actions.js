import axios from 'axios';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const RECEIVE_TASKS_ERRORS = 'RECEIVE_TASKS_ERRORS';

export const fetchTasks = () => (dispatch) => {
  return axios.get('/api/tasks')
    .then(({ data }) => dispatch(receiveTasks(data)))
    .catch((err) => dispatch(receiveErrors(err)));
};

export const createTask = (taskData) => (dispatch) => {
  return axios.post('/api/tasks', taskData)
    .then(({ data }) => dispatch(receiveTask(data)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const updateTask = (taskData) => (dispatch) => {
  const { id, ...data } = taskData;
  return axios.patch(`/api/tasks/${id}`, data)
    .then(({ data }) => dispatch(receiveTask(data)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const deleteTask = (id) => (dispatch) => {
  return axios.delete(`/api/tasks/${id}`)
    .then(() => dispatch(removeTask(id)))
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const receiveTasks = (tasks) => ({
  type: RECEIVE_TASKS,
  tasks
});

export const receiveTask = (task) => ({
  type: RECEIVE_TASK,
  task
});

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  id
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_TASKS_ERRORS,
  errors
});
