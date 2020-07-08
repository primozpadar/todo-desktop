import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase";
import { app } from "../config/firebase";

type User = firebase.User | null | "loading";

export const AuthContext = createContext(
  {} as {
    currentUser: User;
  }
);

const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>("loading");

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
