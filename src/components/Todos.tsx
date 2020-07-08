import React, { useContext } from "react";
import styled from "styled-components";

import TodoCard from "./TodoCard";
import { TodoContext } from "../contexts/TodoContext";

const Todos = () => {
  const { state } = useContext(TodoContext);
  return (
    <Container>
      {state.map((todo) => (
        <TodoCard text={todo.text} _id={todo._id} key={todo._id} done={todo.done} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
`;

export default Todos;
