import React, { useContext } from "react";
import styled from "styled-components";

import { ReactComponent as IconDone } from "../assets/done.svg";
import { ReactComponent as IconUndo } from "../assets/undo.svg";
import { ReactComponent as IconDelete } from "../assets/delete.svg";
import { TodoContext } from "../contexts/TodoContext";

interface Props {
  _id: string;
  text: string;
  done: boolean;
}

const TodoCard = ({ text, _id, done }: Props) => {
  const { dispatch } = useContext(TodoContext);

  return (
    <Card done={done}>
      <p>{text}</p>
      <BtnContainer>
        {done ? (
          <>
            <IconUndo fill="var(--rumena)" onClick={() => dispatch({ type: "DONE", _id, prev: done })} />
            <IconDelete fill="var(--rdeca)" onClick={() => dispatch({ type: "REMOVE", _id })} />
          </>
        ) : (
          <IconDone fill="var(--zelena)" onClick={() => dispatch({ type: "DONE", _id, prev: done })} />
        )}
      </BtnContainer>
    </Card>
  );
};

interface CardProps {
  done: boolean;
}

const Card = styled.div`
  background: ${(props: CardProps) => (props.done ? "var(--zelena)" : "var(--modra)")};
  color: var(--crna);
  padding-left: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 1.5rem 0.2rem rgba(0, 0, 0, 0.2);
`;

const BtnContainer = styled.div`
  background: var(--crna);
  padding: 0.4rem 0.4rem;
  border: 1px solid var(--crna);
  display: flex;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.1);

  & svg {
    height: 1.4rem;
    width: 1.4rem;
    margin: 0 0.4rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

export default TodoCard;
