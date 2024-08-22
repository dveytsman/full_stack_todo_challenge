import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const getTodos = () => axios.get(`${API_URL}todos/`);
export const createTodo = (todo) => axios.post(`${API_URL}todos/`, todo);
export const updateTodo = (id, todo) =>
  axios.put(`${API_URL}todos/${id}/`, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}todos/${id}/`);
export const getQuote = () => axios.get(`${API_URL}quote/`);
export const getRandQuote = () => axios.get(`${API_URL}randquote/`);
