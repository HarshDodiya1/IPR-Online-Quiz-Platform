import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
});

export default rootReducer;
