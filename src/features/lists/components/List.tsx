import { Box, Input, styled } from "@mui/material";
import React, { useRef } from "react";
import { CardContainer } from "../../card";

const ListWrapper = styled(Box)`
  padding: 10px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  background-color: white;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  transition: all 0.2s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[3]};
  }
  &:last-child {
    margin-right: 8px;
  }
`;

const EditInput = styled(Input)`
  width: 100%;
  resize: none;
  border: none;
  font-size: 18px;
  cursor: pointer;

  &::before {
    border: none;
  }

  &:hover {
    &&::before {
      border: none;
    }
  }

  && input {
    cursor: pointer;
    font-weight: 600;
    &:focus {
      cursor: text;
    }
  }

  &:focus {
    cursor: text;
  }
`;

const ListTitle = styled("h2")`
  display: none;
`;

interface Props {
  title: string;
}

export const List: React.FC<Props> = () => {
  const ref = useRef<HTMLInputElement>();
  return (
    <ListWrapper>
      <ListTitle>Title</ListTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ref.current?.blur();
        }}
      >
        <EditInput inputRef={ref} defaultValue={"Title"} />
      </form>
      <CardContainer />
    </ListWrapper>
  );
};
