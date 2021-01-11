import { combineReducers } from "@reduxjs/toolkit";
import sysInfo from "./sysinfo/sysSlice";

const rootReducer = combineReducers({
  sysInfo,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
