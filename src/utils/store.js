import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import userSlice from "./userSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    user: userSlice,
    users: usersSlice,
  },
});
export default store;
