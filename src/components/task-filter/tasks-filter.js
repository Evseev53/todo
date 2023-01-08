import React, { Component } from 'react';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    onToggleVisible() {
      return new Error('В TasksFilter не передана функция onToggleVisible');
    },
  };

  state = {
    selected: null,
  };

  onSelected = (buttonName) => {
    const { onToggleVisible } = this.props;
    onToggleVisible(buttonName);
    this.setState(() => ({ selected: buttonName }));
  };

  render() {
    const { selected } = this.state;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={selected === 'all' ? 'selected' : null}
            onClick={() => this.onSelected('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={selected === 'active' ? 'selected' : null}
            onClick={() => this.onSelected('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={selected === 'completed' ? 'selected' : null}
            onClick={() => this.onSelected('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
