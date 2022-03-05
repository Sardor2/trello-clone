import React, { useEffect } from "react";
import { styled, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "commons/hooks";
import { Spinner } from "commons/components/Spinner";
import { List } from "./List";
import { loadLists } from "../state/list-slice";
import { selectAllLists } from "../state/list.selectors";
import { AddListForm } from "./AddListForm";

const Wrapper = styled("div")`
  display: flex;
  gap: 10px;
  padding-left: 8px;
`;

export const ListContainer = () => {
  const lists = useAppSelector(selectAllLists);
  const isLoading = useAppSelector((s) => s.lists.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLists());
  }, []);

  if (isLoading) {
    return <Spinner loading />;
  }

  return (
    <Wrapper>
      {lists.map((item) => (
        <List {...item} key={item.id} />
      ))}
    </Wrapper>
  );
};
