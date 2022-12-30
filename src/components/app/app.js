import React from "react";
import "./app.css"
import NewTaskForm from "../new-task-form/new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";


const App = () => {

    const todoData = [
        {label: 'Completed task', condition: 'completed', id: 1},
        {label: 'Editing task', condition: 'editing', id: 2},
        {label: 'Active task', condition: null, id: 3}
    ];

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className="main">
                <TaskList todos={todoData}/>
                <Footer />
            </section>
        </section>
    )
};


export default App;