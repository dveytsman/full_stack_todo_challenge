import React, { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getQuote,
  getRandQuote,
} from "./services/todoService";
import "./App.css"; // Import your CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchTodos();
    fetchRandQuote();
  }, []);

  const fetchTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const fetchRandQuote = async () => {
    const response = await getRandQuote();
    setQuote(response.data.text);
  };

  const handleCreateTodo = async () => {
    if (newTodo.title.trim() === "") return;
    const response = await createTodo(newTodo);
    setTodos([...todos, response.data]);
    setNewTodo({ title: "", description: "" });
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    const response = await updateTodo(id, updatedTodo);
    setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="quote-container">
        <h2>{quote}</h2>
        <button onClick={fetchRandQuote}>Get New Quote</button>
      </div>

      <div className="todo-inputform">
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          placeholder="Description"
        />
        <button onClick={handleCreateTodo}>Add To-Do</button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className={todo.completed ? "completed" : ""}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
