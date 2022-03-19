import React, { useEffect } from "react";
import { styled, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "commons/hooks";
import { Spinner } from "commons/components/Spinner";
import { List } from "./List";
import {
  loadLists,
  moveCard,
  moveList,
  updateLists,
} from "../state/list-slice";
import { selectListIds } from "../state/list.selectors";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { DropDragItems, listEntity } from "commons";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebase-config";
import { normalize } from "normalizr";

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
    const q = query(collection(db, "lists"), orderBy("order"));

    const unsubs = onSnapshot(q, (coll) => {
      const lists = coll.docs.map((item) => item.data());
      const normalizedState = normalize(lists, [listEntity]);
      // dispatch(
      //   updateLists(normalizedState.entities)
      // )
    });

    return () => {
      unsubs();
    };
  }, []);

  if (isLoading) {
    return <Spinner loading />;
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === DropDragItems.LIST) {
      if (source.index === destination.index) return;
      dispatch(
        moveList({
          destination,
          source,
        })
      );
    } else {
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;
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
