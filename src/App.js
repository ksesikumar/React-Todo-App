import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodoList(savedTodoList);

    // Check if the user is already logged in by looking for a token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true); // Update the authentication state if a token exists
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token); // Save token in localStorage after login
    setIsAuthenticated(true); // Update authentication state
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token from localStorage on logout
    setIsAuthenticated(false); // Reset authentication state
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/todo" /> : <Navigate to="/register" />}
          />

          {/* Register Route */}
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/todo" /> : <Register />}
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/todo" /> : <Login handleLogin={handleLogin} />}
          />

          {/* Todo List Route */}
          <Route
            path="/todo"
            element={isAuthenticated ? (
              <div className="todos-bg-container">
                <div className="container">
                  <button onClick={handleLogout} className="logoutButton">Logout</button>
                  <TodoList todoList={todoList} setTodoList={setTodoList} />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
