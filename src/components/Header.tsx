import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";

import { TodoContext } from "../contexts/TodoContext";
import { ReactComponent as IconAdd } from "../assets/add.svg";
import Settings from "./Settings";

const Header: React.FC = () => {
  const { dispatch } = useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [val, setVal] = useState<string>("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "ADD", data: val });
    setVal("");
    setVisible(false);
  };

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (visible) return input.focus();
    input.blur();
  });

  return (
    <Container>
      <SearchContainer onSubmit={submitHandler} visible={visible}>
        <AddBtn onClick={() => setVisible(!visible)}>
          <IconAdd />
        </AddBtn>
        <Input ref={inputRef} onChange={(e) => setVal(e.target.value)} value={val} required />
      </SearchContainer>
      <Settings />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2rem;
  gap: 1rem;
`;

interface SearchContainerProps {
  visible?: boolean;
}

const SearchContainer = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: var(--modra);
  border-radius: 0.2rem;
  height: 2.4rem;
  width: ${(props: SearchContainerProps) => (props.visible ? "100%" : "2.4rem")};
  transition: width 0.3s ease-in-out;
  overflow: hidden;
`;

const AddBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  cursor: pointer;
  padding: 0.4rem;

  & svg {
    fill: var(--crna);
  }
`;

interface InputProps {
  visible?: boolean;
}

const Input = styled.input`
  width: 100%;
  margin: 0 0.4rem;
  border-radius: 0.2rem;
  padding: 0.25rem;
  color: var(--crna);
`;

export default Header;
