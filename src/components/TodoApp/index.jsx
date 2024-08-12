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

const TodoApp = ({ tasks, addTask, toggleTask, deleteTask, editTask }) => {
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');

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

  return (
    <div className={styles.todoApp}>
      <h1>Todo App</h1>
      <input
        type='text'
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder='Нове завдання'
      />
      <input
        type='date'
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
      />
      <button onClick={handleAddTask}>Додати завдання</button>

      <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
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
