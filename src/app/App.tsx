import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import { Header } from "../commons/components/Header";
import "../styles.css";
import { ListContainer } from "../features";
import { AddListForm } from "features/lists/components/AddListForm";
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "firebase";

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
  useEffect(() => {
    (async () => {
      const listRef = collection(db, "lists");

      // const cards = await getDocs(cardsRef).then((res) =>
      //   res.docs.map((d) => d.data())
      // );

      // console.log(cards);

      const list1 = await getDocs(listRef).then((res) =>
        res.docs.map((d) => d.data())
      );

      console.log(list1);
    })();
  }, []);
  return (
    <BoxCanvas>
      <Header />
      <Box display={"flex"} marginTop={15}>
        <ListContainer />
        <AddListForm />
      </Box>
    </BoxCanvas>
  );
}
