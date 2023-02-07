import React, { useState } from 'react';
import './tasks-filter.css';

export default function TasksFilter ({ onToggleVisible }) {
  const [selected, setSelected] = useState(null);

  const onSelected = (buttonName) => {
    onToggleVisible(buttonName);
    setSelected(buttonName);
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={selected === 'all' ? 'selected' : null}
          onClick={() => onSelected('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={selected === 'active' ? 'selected' : null}
          onClick={() => onSelected('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={selected === 'completed' ? 'selected' : null}
          onClick={() => onSelected('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}
