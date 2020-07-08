import React, { createContext, useReducer, useEffect } from "react";
import { Actions, State, initialState } from "./ts/TodoTypes";

import { TodoType } from "../types";
import firebase from "firebase";
import db from "../config/firebase";

export const TodoContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Actions>;
  }
);

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "ADD":
      db.collection("todos").add({
        text: action.data,
        done: false,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      return state;
    case "DONE":
      db.collection("todos").doc(action._id).update({ done: !action.prev });
      return state;
    case "REMOVE":
      db.collection("todos").doc(action._id).delete();
      return state;
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    db.collection("todos")
      .orderBy("created_at", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          let x = doc.data();
          x._id = doc.id;
          return x;
        }) as TodoType[];
        dispatch({ type: "INIT", data });
      });
  }, []);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
