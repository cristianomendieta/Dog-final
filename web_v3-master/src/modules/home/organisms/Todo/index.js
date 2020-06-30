import React from "react";
import { useTodos } from "../../stores/todos.store";

export function Todo({ todo }) {
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo._id)} />
        <label onClick={() => toggleTodo(todo._id)}>{todo.title}</label>
        <span style={{
          position: 'absolute',
          fontSize: 'small',
          bottom: 0,
          right: 10
        }}>created by: {todo.user.name}</span>
        <button className="destroy" onClick={() => removeTodo(todo._id)}></button>
      </div>
    </li>
  )
}
