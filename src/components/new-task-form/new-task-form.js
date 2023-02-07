import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default function NewTaskForm ({ createTodoItem }) {
  const [todo, setTodo] = useState({todo: null});
  const [min, setMin] = useState({min: null});
  const [sec, setSec] = useState({sec: null});

  const onEnterDown = (e) => {
    if (e.code === 'Enter') {
      createTodoItem(todo.todo, min.min, sec.sec);
      const form = document.querySelector('.new-todo-form');
      const inputs = form.querySelectorAll('input');
      inputs.forEach(el => el.value = '');
      setTodo({todo: null});
      setMin({min: null});
      setSec({sec: null});
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const obj = {[name]: value};
    if (name === 'todo') {
      setTodo(obj);
    } else if (name === 'min') {
      setMin(obj);
    } else if (name === 'sec') {
      setSec(obj);
    }
  };

  return (
    <form className="new-todo-form">
      <input
        name="todo"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={onEnterDown}
        onChange={onChange}
      />
      <input
        name="min"
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Min"
        onKeyDown={onEnterDown}
        onChange={onChange}
      />
      <input
        name="sec"
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Sec"
        onKeyDown={onEnterDown}
        onChange={onChange}
      />
    </form>
  );
}
