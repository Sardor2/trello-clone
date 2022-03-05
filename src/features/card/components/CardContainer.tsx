import { styled } from "@mui/material";
import React from "react";
import Card from "./Card";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
`;

export const CardContainer: React.FC<{ cards: string[]; listId: string }> = ({
  cards,
  listId,
}) => {
  return (
    <Wrapper>
      {cards.map((card) => (
        <Card listId={listId} key={card} id={card} />
      ))}
    </Wrapper>
  );
};
