import { AppThunk } from "../index";
import { ISysInfo } from "./sysModel";
import { getSysInfoSuccess } from "./sysSlice";

export const getSysInfo = (): AppThunk => async (dispatch, state, ipc) => {
  try {
    const sysInfo = await ipc.send<ISysInfo>("system-info");
    dispatch(getSysInfoSuccess(sysInfo));
  } catch {
    return;
  }
};
