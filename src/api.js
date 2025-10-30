import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/tasks";

export const getTasks = () => axios.get(API_BASE_URL);
export const createTask = (task) => axios.post(API_BASE_URL, task);
export const updateTask = (id, updatedTask) =>
  axios.put(`${API_BASE_URL}/${id}`, updatedTask);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/${id}`);
