import React from "react";
import { Store, Action } from "redux";
import { Provider } from "react-redux";

import { RootState } from "./redux/store/route.reducers";
import SysInfoContainer from "./containers/Info";

const App: React.FC<{ store: Store<RootState, Action> }> = ({ store }) => {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>I'm React running in Electron App!!</h1>
        <h2>pippo</h2>
        <h2>pippo</h2>
        <h2>pippo</h2>
        <h2>pippo</h2>
        <h2>pippo</h2>
        <SysInfoContainer />
      </div>
    </Provider>
  );
};

export default App;
