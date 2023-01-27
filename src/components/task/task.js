import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Timer from '../timer/timer';

export default class Task extends Component {
  static defaultProps = {
    onDeleted() {
      return new Error('В Task не передана функция onDeleted');
    },
    onToggleDone() {
      return new Error('В Task не передана функция onToggleDone');
    },
    onToggleEdit() {
      return new Error('В Task не передана функция onToggleEdit');
    },
  };

  static propsTypes = {
    label: PropTypes.string,
    id: PropTypes.number,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
    done: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.string,
  };

  state = {
    text: this.props.label,
  };

  onEnterDown = (e) => {
    if (e.code === 'Escape') {
      const { onToggleEdit, id } = this.props;
      const { text } = this.state;
      onToggleEdit(id, text);
      const input = document.querySelector('.new-todo');
      input.focus();
    }

    if (e.code === 'Enter') {
      const newText = e.target.value;
      const { onToggleEdit, id } = this.props;
      this.setState({
        text: newText,
      });
      onToggleEdit(id, newText);
      const input = document.querySelector('.new-todo');
      input.focus();
    }
  };

  todolistMutationObserver = () => {
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

  render() {
    const { label, id, onDeleted, onToggleDone, onToggleEdit, done, editing, date, sec, timerStart, timerStop, timer } = this.props;
    const { text } = this.state;
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

    this.todolistMutationObserver();

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
            onChange={this.onLabelChange}
            onKeyDown={this.onEnterDown}
          />
        </li>
      </div>
    );
  }
}