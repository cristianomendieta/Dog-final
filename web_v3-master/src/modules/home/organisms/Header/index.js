import React, { useState, useCallback } from "react";
import { useTodos } from '../../stores/todos.store';
import Input from "../../../../commons/atoms/Input";

export function Header() {
  const { addTodo } = useTodos();
  const onEnter = useCallback((value) => {
    addTodo(value);
  }, []);

  return (
    <header className="header">
      <h1>todos</h1>
      <Input onEnter={onEnter} placeholder="What needs to be done?" autoFocus />
    </header>
  );
}

