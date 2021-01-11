import { Store, Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import rootReducer, { RootState } from "./route.reducers";
import { getIPCService, IpcService } from "./IPC/IpcService";

const IPCServe = getIPCService();

const store: Store = configureStore({
  reducer: rootReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: IPCServe,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, IpcService, Action<string>>;

export default store;
