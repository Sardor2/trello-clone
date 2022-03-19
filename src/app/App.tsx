import { Box, styled } from "@mui/material";
import React from "react";
import { Header } from "../commons/components/Header";
import "../styles.css";
import { ListContainer } from "../features";
import { AddListForm } from "features/lists/components/AddListForm";
import { useAppSelector } from "commons";
import { selectIsLogged } from "features/lists/state/auth-slice";
import Board from "screens/board";
import LoginScreen from "screens/login";

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
  const isLoggedIn = useAppSelector(selectIsLogged);
  return isLoggedIn ? <Board /> : <LoginScreen />;
}
