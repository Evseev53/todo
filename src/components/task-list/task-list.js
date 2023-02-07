import React from 'react';

import './task-list.css';
import Task from '../task/task';

export default function TaskList ({ todos, timerStart, timerStop, onDeleted, onToggleDone, onToggleEdit }) {
  const elements = todos.map((item) => (
    <div key={item.id}>
      <Task
        {...item}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        onToggleEdit={ onToggleEdit }
        timerStart={ timerStart }
        timerStop={ timerStop }
      />
    </div>
  ));

  return <ul className="todo-list">{ elements }</ul>;
}
