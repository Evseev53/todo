import React from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

function NewTaskForm({ createTodoItem }) {
  const onSubmit = (e) => {
    const newTodo = e.target.value;
    createTodoItem(newTodo);
    e.target.value = '';
  };

  const onEnterDown = (e) => {
    if (e.code === 'Enter') {
      const newTodo = e.target.value;
      createTodoItem(newTodo);
      e.target.value = '';
    }
  };

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onBlur={onSubmit}
      onKeyDown={onEnterDown}
    />
  );
}

NewTaskForm.defaultProps = {
  createTodoItem() {
    return new Error('В NewTaskForm не передана функция createTodoItem');
  },
};

NewTaskForm.propTypes = {
  createTodoItem: PropTypes.func,
};

export default NewTaskForm;
