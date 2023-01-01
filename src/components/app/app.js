import React, { Component } from "react";
import "./app.css"
import NewTaskForm from "../new-task-form/new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";

export default class App extends Component {

    state = {
        todoData: [
            {label: 'Completed task', id: 1},
            {label: 'Editing task', id: 2},
            {label: 'Active task', id: 3}
        ]
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const newData = todoData.filter(el => el.id !== id);
            return {
                todoData: newData
            }
        })
    }

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm />
                </header>
                <section className="main">
                    <TaskList todos={this.state.todoData}
                              onDeleted={(id) => this.deleteItem(id)}
                    />
                    <Footer />
                </section>
            </section>
        )
    }
}