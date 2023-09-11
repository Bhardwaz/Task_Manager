import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    toggleTask: (state, action) => {
      const { id } = action.payload;
      const taskToToggle = state.tasks.find((task) => task.id === id);

      if (taskToToggle) {
        taskToToggle.status = !taskToToggle.status;
      }
    },
  },
});
export const { addTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
