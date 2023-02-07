import React, { useState } from 'react';

import './app.css';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default function App () {
  const [todoData, setTodoData] = useState([]);
  const [visible, setVisible] = useState('all');
  const [maxId, setMaxId] = useState(1);

  const toggleProperty = (id, propName, arr = todoData, value = !arr[arr.findIndex((el) => el.id === id)][propName]) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: value };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const timerStop = (id) => {
    const todo = todoData.filter(el => el.id === id);
    const { timerId } = todo[0];
    clearInterval(timerId);
    setTodoData(toggleProperty(id, 'timer', todoData, 'off'));
  }

  const deleteItem = (id) => {
    timerStop(id);
    setTodoData(() => todoData.filter((el) => el.id !== id));
  };

  const clearCompleted = () => {
    const notDone = todoData.filter((el) => el.done === false);
    const newData = [...notDone];
    setTodoData(newData);
  };

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(id, 'done'));
  };

  const onToggleEdit = (id, text) => {
    const editingTodoData = toggleProperty(id, 'editing')
    setTodoData(editingTodoData);
    setTodoData(toggleProperty(id, 'label', editingTodoData, text));
  };

  const onToggleVisible = (value) => {
    setVisible(value);
  };

  const tasksFilter = (valFilter) => {
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

  const getSec = (min, sec) => {
    const minInSec = min * 60;
    return minInSec + Number(sec);
  }

  const createTodoItem = (label, valueMin = 0, valueSec = 0) => {
    const sumSec = getSec(valueMin, valueSec);
    if (label) {
      let maxIdCopy = maxId;
      maxIdCopy++;
      setMaxId(maxIdCopy)
      const newItem = {
        label,
        editing: false,
        done: false,
        id: maxId,
        date: new Date(),
        sec: sumSec,
        timer: 'off',
        timerId: null
      };
      setTodoData(() => {
        if (todoData.length) {
          const oldData = [...todoData];
          return [...oldData, newItem];
        }
        return [newItem];
      });
    }
  }

  const timerStart = (id) => {
    const timerId = setInterval(() => {
      setTodoData((state) => {
        const newArr = state.map( el => {
          if (el.id === id) {
            if (el.sec === 1) {
              clearInterval(timerId);
            }
            el.sec--;
            return el;
          }
          return el;
        })
        return newArr;
      })
    }, 1000);

    const timerOn = toggleProperty(id, 'timer', todoData, 'on');
    const saveId = toggleProperty(id, 'timerId', timerOn, timerId);
    setTodoData(timerOn);
    setTodoData(saveId);
  }

  const todoDataVisible = tasksFilter(visible);
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm createTodoItem={createTodoItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todoDataVisible}
          timerStart={timerStart}
          timerStop={timerStop}
          onDeleted={(id) => deleteItem(id)}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
        />
        <Footer
          todoCount={todoCount}
          clearCompleted={() => clearCompleted()}
          onToggleVisible={ onToggleVisible }
        />
      </section>
    </section>
  );
}
