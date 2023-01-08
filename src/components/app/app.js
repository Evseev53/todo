import React, { Component } from 'react';

import './app.css';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [],
    visible: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newData = todoData.filter((el) => el.id !== id);
      return {
        todoData: newData,
      };
    });
  };

  clearCompleted = () => {
    const notDone = this.state.todoData.filter((el) => el.done === false);
    const newData = [...notDone];
    this.setState(() => ({
      todoData: newData,
    }));
  };

  toggleProperty = (arr, id, propName, value = !arr[arr.findIndex((el) => el.id === id)][propName]) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: value };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }));
  };

  onToggleEdit = (id, text) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'editing'),
    }));
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'label', text),
    }));
  };

  onToggleVisible = (value) => {
    this.setState(() => {
      return { visible: value };
    });
  };

  tasksFilter = (valFilter) => {
    const { todoData } = this.state;
    if (valFilter === 'all') {
      return todoData;
    }
    if (valFilter === 'active') {
      return todoData.filter((el) => el.done === false);
    }
    if (valFilter === 'completed') {
      return todoData.filter((el) => el.done === true);
    }
  };

  createTodoItem(label) {
    if (label) {
      const newItem = {
        label,
        editing: false,
        done: false,
        id: this.maxId++,
        date: new Date(),
      };
      this.setState(({ todoData }) => {
        if (todoData.length) {
          const oldData = [...this.state.todoData];
          return { todoData: [...oldData, newItem] };
        }
        return { todoData: [newItem] };
      });
    }
  }

  render() {
    const { todoData } = this.state;
    const todoDataVisible = this.tasksFilter(this.state.visible);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm createTodoItem={(label) => this.createTodoItem(label)} />
        </header>
        <section className="main">
          <TaskList
            todos={todoDataVisible}
            onDeleted={(id) => this.deleteItem(id)}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
          />
          <Footer
            todoCount={todoCount}
            clearCompleted={() => this.clearCompleted()}
            onToggleVisible={this.onToggleVisible}
          />
        </section>
      </section>
    );
  }
}
