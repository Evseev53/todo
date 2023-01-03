import React, { Component } from "react";
import "./task-list.css"
import Task from "../task/task";

export default class TaskList extends Component {
    static defaultProps = {
        onDeleted() { return new Error('В TaskList не передана функция onDeleted') },
        onToggleDone() { return new Error('В TaskList не передана функция onToggleDone') },
        onToggleEdit() { return new Error('В TaskList не передана функция onToggleEdit') }
    }

    render() {
        const { todos, onDeleted, onToggleDone, onToggleEdit } = this.props;
        const elements = todos.map(item => {
            return (
                <div key={ item.id }>
                    <Task
                        { ...item }
                        onDeleted={() => onDeleted(item.id)}
                        onToggleDone={() => onToggleDone(item.id)}
                        onToggleEdit={ onToggleEdit }
                    />
                </div>
            )
        })

        return (
            <ul className="todo-list">
                { elements }
            </ul>
        )
    }
}