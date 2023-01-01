import React, { Component } from "react";
import "./task-list.css"
import Task from "../task/task";

export default class TaskList extends Component {

    render() {
        const { todos, onDeleted } = this.props;
        const elements = todos.map(item => {
            return (
                <li key={ item.id }>
                    <Task { ...item } onDeleted={() => onDeleted(item.id)}/>
                </li>
            )
        })

        return (
            <ul className="todo-list">
                { elements }
            </ul>
        )
    }
}