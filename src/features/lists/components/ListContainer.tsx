import React, { useEffect } from "react";
import { styled, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "commons/hooks";
import { Spinner } from "commons/components/Spinner";
import { List } from "./List";
import { loadLists, moveCard, moveList } from "../state/list-slice";
import { selectAllLists, selectListIds } from "../state/list.selectors";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { DropDragItems } from "commons";
import { AddListForm } from "./AddListForm";

const Wrapper = styled("div")`
  padding-left: 8px;
  display: flex;
`;

export const ListContainer = () => {
  const listsIds = useAppSelector(selectListIds);
  const isLoading = useAppSelector((s) => s.lists.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLists());
  }, []);

  if (isLoading) {
    return <Spinner loading />;
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (type === DropDragItems.LIST) {
      dispatch(
        moveList({
          destination,
          source,
        })
      );
    } else {
      dispatch(
        moveCard({
          destination,
          source,
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        direction="horizontal"
        droppableId={DropDragItems.LIST}
        type={DropDragItems.LIST}
      >
        {(provided, snapshot) => (
          <Wrapper ref={provided.innerRef}>
            {listsIds.map((item, index) => (
              <Draggable index={index} draggableId={item.toString()} key={item}>
                {(provided, snapshot) => (
                  <List
                    isDragging={snapshot.isDragging}
                    innerRef={provided.innerRef}
                    dragHandleProps={provided.dragHandleProps}
                    draggableProps={provided.draggableProps}
                    id={item}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};
