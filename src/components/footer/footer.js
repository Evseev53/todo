import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TasksFilter from '../task-filter/tasks-filter';

function Footer({ todoCount, clearCompleted, onToggleVisible }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter onToggleVisible={onToggleVisible} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  todoCount: 0,
};

Footer.propTypes = {
  todoCount: PropTypes.number,
};

export default Footer;
