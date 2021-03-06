import { styled } from "@mui/material";
import { createSelector, EntityId } from "@reduxjs/toolkit";
import { theme } from "app/theme";
import { DropDragItems, useAppDispatch, useAppSelector } from "commons";
import { selectListById } from "features/lists/state/list.selectors";
import React from "react";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import Card from "./Card";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  min-height: 100px;
`;

const CardOverlay = styled("div")`
  height: 50px;
  background-color: ${theme.palette.grey[500]};
`;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "transparent",
  padding: 8,
  margin: "10px 0",
});

const selectCardOfList = createSelector(
  [selectListById],
  (list) => list?.cards 
)

export const CardContainer: React.FC<{listId: EntityId }> = ({
  listId,
}) => {
  const cards = useAppSelector(s => selectCardOfList(s,listId))
  return (
    <Droppable droppableId={listId.toString()} type={DropDragItems.CARD}>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {cards?.map((card, index) => (
            <Draggable key={card} index={index} draggableId={card}>
              {(provided, snapshot) => (
                <Card
                  innerRef={provided.innerRef}
                  index={index}
                  listId={listId.toString()}
                  id={card}
                  dragHandleProps={provided.dragHandleProps}
                  draggableProps={provided.draggableProps}
                  isDragging={snapshot.isDragging}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default React.memo(CardContainer)
