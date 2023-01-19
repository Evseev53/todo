import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task/task';

export default class TaskList extends Component {
  static defaultProps = {
    onDeleted() {
      return new Error('В TaskList не передана функция onDeleted');
    },
    onToggleDone() {
      return new Error('В TaskList не передана функция onToggleDone');
    },
    onToggleEdit() {
      return new Error('В TaskList не передана функция onToggleEdit');
    },
  };

  static propsTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
  };

  render() {
    const { todos, updateSecondsInTodo, onDeleted, onToggleDone, onToggleEdit } = this.props;
    const elements = todos.map((item) => (
      <div key={item.id}>
        <Task
          {...item}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          onToggleEdit={onToggleEdit}
          updateSecondsInTodo={ updateSecondsInTodo }
        />
      </div>
    ));

    return <ul className="todo-list">{elements}</ul>;
  }
}
