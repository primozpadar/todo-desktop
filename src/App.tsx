import React, { useContext } from "react";
import styled from "styled-components";

import Header from "./components/Header";
import Login from "./components/Login";
import Todos from "./components/Todos";

import { AuthContext } from "./contexts/AuthContext";

const App: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Container>
      {currentUser === "loading" ? null : currentUser ? (
        <>
          <Header />
          <Todos />
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
};

const Container = styled.div`
  background: rgba(3, 29, 38, 0.75);
  height: 100vh;
  padding: 1rem;
`;

export default App;
