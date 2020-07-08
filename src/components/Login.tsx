import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { app } from "../config/firebase";

const { ipcRenderer } = window.require("electron");

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);

  useEffect(() => {
    setErr(false);
  }, [email, pass]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    app
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(() => setErr(true));
  };

  return (
    <Container onSubmit={handleLogin}>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
      {err ? <ErrMsg>Login error!</ErrMsg> : null}
      <ButtonContainer>
        <CloseBtn onClick={() => ipcRenderer.send("closeApp")}>Close</CloseBtn>
        <Button>Login</Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  color: var(--crna);
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.25rem 0.4rem;
  border-radius: 0.2rem;
  &:focus {
    box-shadow: 0 0 0 3px var(--zelena);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  color: var(--crna);
  background: var(--zelena);
  padding: 0.4rem 2rem;
  border-radius: 10rem;
  font-weight: bold;
  cursor: pointer;
`;

const CloseBtn = styled.div`
  color: var(--rdeca);
  font-weight: bold;
  cursor: pointer;
`;

const ErrMsg = styled.p`
  color: var(--rdeca);
  margin-bottom: 0.6rem;
  font-weight: bold;
  height: 1.4rem;
  animation: errAnimation 0.3s ease-in-out;

  @keyframes errAnimation {
    0% {
      height: 0;
      transform: scale(0);
    }
    90% {
      transform: scale(1.1);
    }
    100% {
      height: 1.4rem;
      transform: scale(1);
    }
  }
`;

export default Login;
