import React from 'react';
import styles from './TodoItem.module.sass';

const TodoItem = ({ task, toggleTask, deleteTask }) => {
  const isOverdue = new Date(task.deadline) < new Date() && !task.isDone;

  return (
    <li className={isOverdue ? styles.overdue : ''}>
      <span onClick={() => toggleTask(task.id)}>{task.value}</span>
      <button onClick={() => deleteTask(task.id)}>Видалити</button>
    </li>
  );
};

export default TodoItem;
