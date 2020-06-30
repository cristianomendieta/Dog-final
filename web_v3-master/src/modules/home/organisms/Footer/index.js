import React from "react";
import { useFilter, FILTERS } from "../../stores/filter.store";
import { useTodos } from "../../stores/todos.store";
import { useTodosLeft } from "../../stores/todosSelectors.stores";

export function Footer() {
  const [filter, setFilter] = useFilter();
  const { clearCompleted } = useTodos()
  const todosLeft = useTodosLeft();

  return (
    <footer className="footer">
      <span className="todo-count">{todosLeft} items left</span>
      <ul className="filters">
        {
          Object.keys(FILTERS).map(filterKey => (
            <li key={filterKey}>
              <a
                onClick={() => setFilter(filterKey)}
                className={filter === filterKey ? 'selected' : ''}>{FILTERS[filterKey]}</a>
            </li>
          ))
        }
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}
