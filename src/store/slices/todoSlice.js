import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    editTask: (state, action) => {
      const { id, value, deadline } = action.payload;
      const task = state.tasks.find(t => t.id === id);

      if (task) {
        task.value = value;
        task.deadline = deadline;
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask } = todoSlice.actions;

export default todoSlice.reducer;
