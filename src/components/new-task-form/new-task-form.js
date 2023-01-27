import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    createTodoItem() {
      return new Error('В NewTaskForm не передана функция createTodoItem');
    },
  };

  static propTypes = {
    createTodoItem: PropTypes.func,
  };

  state = {
    todo: null,
    min: null,
    sec: null,
  };

  onEnterDown = (e) => {
    if (e.code === 'Enter') {
      const { createTodoItem } = this.props;
      const { todo, min, sec } = this.state;
      createTodoItem(todo, min, sec);
      const form = document.querySelector('.new-todo-form');
      const inputs = form.querySelectorAll('input');
      inputs.forEach(el => el.value = '');
      this.setState({
        todo: null,
        min: null,
        sec: null,
      })
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className="new-todo-form">
        <input
          name="todo"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyDown={this.onEnterDown}
          onChange={this.onChange}
        />
        <input
          name="min"
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Min"
          onKeyDown={this.onEnterDown}
          onChange={this.onChange}
        />
        <input
          name="sec"
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyDown={this.onEnterDown}
          onChange={this.onChange}
        />
      </form>
    );
  }
}
