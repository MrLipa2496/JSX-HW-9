import React from 'react';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.sass';

const TodoList = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <ul className={styles.todoList}>
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;
