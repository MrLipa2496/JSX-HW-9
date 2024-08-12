import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
} from '../../store/slices/todoSlice';
import TodoList from './TodoList';
import styles from './TodoApp.module.sass';
import classNames from 'classnames';

const TodoApp = ({ tasks, addTask, toggleTask, deleteTask, editTask }) => {
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (newTask.trim() && deadline) {
      const task = {
        id: uuidv4(),
        value: newTask,
        isDone: false,
        deadline: deadline,
      };
      addTask(task);
      setNewTask('');
      setDeadline('');
    }
  };

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
  };

  const allFilterClassName = classNames(styles.commonBtn, {
    [styles.active]: filter === 'all',
  });
  const completedFilterClassName = classNames(styles.commonBtn, {
    [styles.active]: filter === 'completed',
  });
  const pendingFilterClassName = classNames(styles.commonBtn, {
    [styles.active]: filter === 'pending',
  });

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isDone;
    if (filter === 'pending') return !task.isDone;
    return true;
  });

  return (
    <div className={styles.todoApp}>
      <h2 className={styles.appTitle}>Todo App</h2>

      <div className={styles.inputWrapper}>
        <input
          className={styles.taskInput}
          type='text'
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder='New Task'
        />
        <input
          className={styles.dateInput}
          type='date'
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
      </div>

      <button className={styles.taskAddBtn} onClick={handleAddTask}>
        Add
      </button>

      <TodoList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />

      <div className={styles.filters}>
        <button
          className={allFilterClassName}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={completedFilterClassName}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
        <button
          className={pendingFilterClassName}
          onClick={() => handleFilterChange('pending')}
        >
          Active
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.todos.tasks,
});

const mapDispatchToProps = {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
