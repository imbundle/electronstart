import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISysInfo } from "./sysModel";

export type ISysState = {
  info: ISysInfo | null;
};

const initialState: ISysState = {
  info: null,
};

const sysInfoSlice = createSlice({
  name: "sysinfo",
  initialState,
  reducers: {
    getSysInfoSuccess(state, action: PayloadAction<ISysInfo>) {
      state.info = action.payload;
    },
  },
});

export const { getSysInfoSuccess } = sysInfoSlice.actions;

export default sysInfoSlice.reducer;
