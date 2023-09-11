import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  addUsers: (state, action) => {
    state.users.push(action.payload);
  },
  removeUsers: (state) => {
    state.users = [];
  },
});

export const { addUsers, removeUsers } = usersSlice.actions;
export default usersSlice.reducer;
