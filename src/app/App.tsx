import { Box, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Header } from "../commons/components/Header";
import "../styles.css";
import { ListContainer } from "../features";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddListForm } from "features/lists/components/AddListForm";

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
  const scrollRef = useRef<HTMLElement>();
  useEffect(() => {
    scrollRef.current?.scrollTo(scrollRef.current.scrollWidth, 0);
  }, []);
  return (
    <BoxCanvas ref={scrollRef}>
      <Header />
      <Box display={"flex"} marginTop={15}>
        <ListContainer />
        <AddListForm />
      </Box>
    </BoxCanvas>
  );
}
