import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
 
import Home from "./src/screen/Home";
 
const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
 
export default App;
