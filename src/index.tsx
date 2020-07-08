import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AuthContextProvider from "./contexts/AuthContext";
import TodoContextProvider from "./contexts/TodoContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
