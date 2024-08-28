import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = () => {
        if (!newTask.trim()) {
            alert("Please enter a valid task");
            return;
        }
        const newTodo = {
            id: todos.length + 1,
            text: newTask,
            isChecked: false,
        };
        setTodos([...todos, newTodo]);
        setNewTask("");
    };

    const saveTodos = () => {
        localStorage.setItem("todoList", JSON.stringify(todos));
    };

    const toggleTodoStatus = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div className="todo-list-container">
            <h1 className="todos-heading">TODO APP</h1>

            <h2 className="create-task-heading">
                Create <span className="create-task-heading-subpart">Task</span>
            </h2>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="todo-user-input"
                placeholder="What needs to be done?"
            />
            <button onClick={addTodo} className="button">
                Add
            </button>

            <h2 className="todo-items-heading">
                My <span className="todo-items-heading-subpart">Tasks</span>
            </h2>
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodoStatus={toggleTodoStatus}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
            <button onClick={saveTodos} className="button">
                Save
            </button>
        </div>
    );
}

export default TodoList;
