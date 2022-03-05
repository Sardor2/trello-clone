import { Delete } from "@mui/icons-material";
import { Box, IconButton, Input, styled } from "@mui/material";
import { theme } from "app/theme";
import { DragItems, useAppDispatch } from "commons";
import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { CardContainer } from "../../card";
import {
  moveCard,
  removeList,
  updateListEntityTitle,
} from "../state/list-slice";
import { AddCardForm } from "./AddCardForm";

const ListWrapper = styled(Box)<{ isOver: boolean }>`
  padding: 10px;
  min-width: 250px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.isOver ? props.theme.palette.grey[500] : "white"};
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

interface Props {
  title: string;
  id: string;
  cards: string[];
}

export const List: React.FC<Props> = React.memo(({ title, cards, id }) => {
  const ref = useRef<HTMLInputElement>();
  const [formTitle, setFormTitle] = useState(title);
  const dispatch = useAppDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragItems.CARD,
    drop: (item: { cardId: string; listId: string }, monitor) => {
      dispatch(
        moveCard({
          fromListId: item.listId,
          toListId: id,
          cardId: item.cardId,
        })
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <ListWrapper isOver={isOver} ref={drop}>
      <ListTitle>{title}</ListTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(ref.current?.title);
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
      <CardContainer listId={id} cards={cards} />
      <AddCardForm listId={id} />
      <IconButton
        onClick={() => dispatch(removeList(id))}
        className="delete-icon"
      >
        <Delete />
      </IconButton>
    </ListWrapper>
  );
});
