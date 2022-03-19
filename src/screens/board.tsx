import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { useAppSelector } from "commons";
import { Header } from "commons/components";
import { ListContainer } from "features";
import { AddListForm } from "features/lists/components/AddListForm";
import React from "react";

const BoxCanvas = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
`;

const Board = () => {
  const isLoading = useAppSelector((state) => state.lists.isLoading);

  return (
    <BoxCanvas>
      <Header />
      <Box display={"flex"} marginTop={15}>
        <ListContainer />
        {!isLoading && <AddListForm />}
      </Box>
    </BoxCanvas>
  );
};

export default Board;
