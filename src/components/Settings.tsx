import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as IconSettings } from "../assets/settings.svg";
import { app } from "../config/firebase";

const { ipcRenderer } = window.require("electron");

const Settings: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Container>
      <IconSettings onClick={() => setIsVisible(!isVisible)} />
      {isVisible ? (
        <SettingsContainer>
          <Btn onClick={() => app.auth().signOut()}>Logout</Btn>
          <Btn onClick={() => ipcRenderer.send("closeApp")}>Close</Btn>
          <Btn onClick={() => ipcRenderer.send("changeScreen")}>Change screen</Btn>
        </SettingsContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  & svg {
    fill: var(--modra);
    cursor: pointer;
  }
`;

const SettingsContainer = styled.div`
  z-index: 10;
  position: absolute;
  right: 20%;
  top: 100%;
  width: 10rem;
  background: var(--modra);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.2);
`;

const Btn = styled.div`
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0.4rem 0.8rem;
  &:hover {
    color: var(--rumena);
  }
`;

export default Settings;
