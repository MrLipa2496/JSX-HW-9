import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import classNames from 'classnames';
import styles from './TodoItem.module.sass';

const formatDate = dateString => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });

  return `${day} ${month}`;
};

const TodoItem = ({ task, toggleTask, deleteTask, editTask }) => {
  const isOverdue = new Date(task.deadline) < new Date() && !task.isDone;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.value);
  const [editDeadline, setEditDeadline] = useState(task.deadline);

  const handleEdit = () => {
    if (editValue.trim()) {
      editTask({ id: task.id, value: editValue, deadline: editDeadline });
      setIsEditing(false);
    }
  };

  const itemClassName = classNames(styles.info, {
    [styles.todoItem]: true,
    [styles.overdue]: isOverdue,
    [styles.done]: task.isDone,
  });

  const deadlineDate = formatDate(task.deadline);

  return (
    <li className={itemClassName}>
      <input
        type='checkbox'
        checked={task.isDone}
        onChange={() => toggleTask(task.id)}
        className={styles.checkbox}
      />

      {isEditing ? (
        <div className={styles.editWrapper}>
          <input
            type='text'
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            className={styles.editInput}
          />
          <input
            type='date'
            value={editDeadline}
            onChange={e => setEditDeadline(e.target.value)}
            className={styles.editDateInput}
          />
          <div className={styles.btnWrapper}>
            <button onClick={handleEdit} className={styles.saveBtn}>
              +
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={styles.cancelBtn}
            >
              -
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>{task.value}</p>
          <div className={styles.controlPanel}>
            <p className={styles.deadlineDate}>{deadlineDate}</p>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.editBtn}
            >
              <FaEdit />
            </button>
            <button
              className={styles.delBtn}
              onClick={() => deleteTask(task.id)}
            >
              <IoTrashOutline />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
