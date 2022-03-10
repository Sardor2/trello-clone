import { Delete } from "@mui/icons-material";
import { Box, colors, IconButton, Input, styled } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "commons";
import React, { useRef, useState } from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { CardContainer } from "../../card";
import { removeList, updateListEntityTitle } from "../state/list-slice";
import { selectListById } from "../state/list.selectors";
import { AddCardForm } from "./AddCardForm";

const ListWrapper = styled(Box)<{ isDragging: boolean }>`
  padding: 10px;
  min-width: 250px;
  max-width: 300px;
  height: max-content;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.isDragging ? colors.grey[200] : "white"};
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows[2]};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[3]};

    & .delete-icon {
      opacity: 1;
      display: block;
    }
  }
  &:last-child {
    margin-right: 8px;
  }

  .delete-icon {
    opacity: 0;
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    svg {
      color: ${(props) => props.theme.palette.error.light};
    }
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

type Props = {
  id: EntityId;
  innerRef: React.Ref<HTMLDivElement>;
  isDragging: boolean;
  draggableProps: DraggableProvidedDraggableProps | undefined;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
};

export const List: React.FC<Props> = ({
  id,
  innerRef,
  isDragging,
  dragHandleProps,
  draggableProps,
}) => {
  const ref = useRef<HTMLInputElement>();
  const list = useAppSelector((s) => selectListById(s, id));

  const [formTitle, setFormTitle] = useState(list?.title);

  const dispatch = useAppDispatch();

  return (
    <ListWrapper
      {...dragHandleProps}
      {...draggableProps}
      style={{
        ...draggableProps?.style,
        transform: `${draggableProps?.style?.transform ?? ""} ${
          isDragging ? "rotate(5deg)" : ""
        }`,
      }}
      isDragging={isDragging}
      ref={innerRef}
    >
      <ListTitle>{list?.title}</ListTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (formTitle) {
            dispatch(updateListEntityTitle({ title: formTitle, id }));
          }
          ref.current?.blur();
        }}
      >
        <EditInput
          onChange={(e) => setFormTitle(e.target.value)}
          name="title"
          inputRef={ref}
          value={formTitle}
        />
      </form>
      <CardContainer listId={id} cards={list?.cards ?? []} />
      <AddCardForm listId={id} />
      <IconButton
        onClick={() => dispatch(removeList(id))}
        className="delete-icon"
      >
        <Delete />
      </IconButton>
    </ListWrapper>
  );
};
