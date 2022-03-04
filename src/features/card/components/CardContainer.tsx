import { styled } from "@mui/material";
import React from "react";
import { Card } from "./Card";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
`;

export const CardContainer = () => {
  return (
    <Wrapper>
      <Card />
      <Card />
      <Card />
    </Wrapper>
  );
};
