import React from "react";
import "./footer.css"
import TasksFilter from "../task-filter/tasks-filter";

const Footer = ({ todoCount, clearCompleted, onToggleVisible }) => {

    return (
        <footer className="footer">
            <span className="todo-count">{ todoCount } items left</span>
            <TasksFilter onToggleVisible={ onToggleVisible }/>
            <button
                className="clear-completed"
                onClick={ clearCompleted }>
                Clear completed
            </button>
        </footer>
    )
}

Footer.defaultProps = {
    todoCount: 0,
    clearCompleted () { },
    onToggleVisible () { }
}

export default Footer;