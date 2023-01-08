import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

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

  onLabelChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onEnterDown = (e) => {
    if (e.code === 'Enter') {
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
    const { label, id, onDeleted, onToggleDone, onToggleEdit, done, editing, date } = this.props;
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
              <span className="description">{label}</span>
              <span className="created">Created {distance}</span>
            </label>
            <button type="button" className="icon icon-edit" onClick={() => onToggleEdit(id)} />
            <button type="button" className="icon icon-destroy" onClick={onDeleted} />
          </div>
          <input
            type="text"
            className="edit"
            defaultValue={label}
            onChange={this.onLabelChange}
            onBlur={() => onToggleEdit(id, text)}
            onKeyDown={this.onEnterDown}
          />
        </li>
      </div>
    );
  }
}
