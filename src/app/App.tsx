import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import { Header } from "../commons/components/Header";
import "../styles.css";
import { ListContainer } from "../features";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

export default function App() {
  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);
  return (
    <BoxCanvas>
      <Header />
      <Box marginTop={15}>
        <DndProvider backend={HTML5Backend}>
          <ListContainer />
        </DndProvider>
      </Box>
    </BoxCanvas>
  );
}
