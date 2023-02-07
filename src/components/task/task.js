import React, { useState } from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Timer from '../timer/timer';

export default function Task (
  { label, onToggleEdit, id, onDeleted, onToggleDone, done, editing, date, sec, timerStart, timerStop, timer }
) {
  const [text, setText] = useState(label);

  const onEnterDown = (e) => {
    if (e.code === 'Escape') {
      onToggleEdit(id, text);
      const input = document.querySelector('.new-todo');
      input.focus();
    }

    if (e.code === 'Enter') {
      const newText = e.target.value;
      setText(newText);
      onToggleEdit(id, newText);
      const input = document.querySelector('.new-todo');
      input.focus();
    }
  };

  const todolistMutationObserver = () => {
    const list = document.querySelector('.todo-list');

    const observer = new MutationObserver(() => {
      const elements = list.querySelectorAll('li');
      elements.forEach((elList) => {
        const input = elList.lastChild;
        input.focus();
      });
    });

    observer.observe(list, {
      childList: true,
      subtree: true,
      characterDataOldValue: true,
    });
  };

  const distance = formatDistanceToNow(date, { addSuffix: true });

  let classNames = null;
  let defaultChecked = false;
  if (done) {
    classNames = 'completed';
    defaultChecked = true;
  }
  if (editing) {
    classNames = 'editing';
  }

  todolistMutationObserver();

  return (
    <div>
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={defaultChecked} id={id} onClick={onToggleDone} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <Timer timerStart={ timerStart } timerStop={ timerStop } sec={ sec } id={ id } timer={ timer }/>
            <span className="description">Created {distance}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={() => onToggleEdit(id)} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onKeyDown={onEnterDown}
        />
      </li>
    </div>
  );
}