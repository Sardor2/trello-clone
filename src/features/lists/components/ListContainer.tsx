import React, { useEffect } from "react";
import { styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@commons/hooks";
import { Spinner } from "@commons/components/Spinner";
import { List } from "./List";
import { loadLists } from "../state/list-slice";

const Wrapper = styled("div")`
  display: flex;
  gap: 10px;
  padding-left: 8px;
`;

export const ListContainer = () => {
  const lists = useAppSelector((state) => state.lists.data);
  const isLoading = useAppSelector((s) => s.lists.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLists());
  }, []);

  console.log(lists);

  if (isLoading) {
    return <Spinner loading />;
  }

  return (
    <Wrapper>
      <List title="List" />
      <List title="List" />
    </Wrapper>
  );
};
