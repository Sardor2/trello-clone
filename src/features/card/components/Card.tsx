import { Box, Button, colors, IconButton, Input, styled } from "@mui/material";
import React, { useState } from "react";
import { Edit } from "@mui/icons-material";

const EditIcon = styled((props: any) => {
  return (
    <IconButton {...props}>
      <Edit />
    </IconButton>
  );
})`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  svg {
    width: 15px;
    height: 15px;
  }
`;

const Wrapper = styled(Box)`
  position: relative;
  padding: 5px;
  word-wrap: break-word;
  width: 100%;
  padding-right: 25px;
  background-color: ${colors.grey[100]};
  box-shadow: ${(props) => props.theme.shadows[1]};
  &:hover {
    background-color: ${colors.grey[200]};
    button {
      display: inline-block;
    }
  }

  p {
    font-size: 14px;
    word-break: break-all;
  }
`;
const EditInput = styled(Input)`
  width: 100%;
  resize: none;
  border: none;
  font-size: 14px;
`;

const SaveButton = styled(Button)`
  text-transform: capitalize;
  font-weight: bold;
  padding: 0px 10px;
  margin-top: 5px;
`;

export const Card = () => {
  const [isEditing, setEditing] = useState(false);
  return (
    <Wrapper>
      {isEditing ? (
        <form action="">
          <EditInput autoFocus multiline defaultValue="fafafsdfsafsdfs" />
          <SaveButton onClick={() => setEditing(false)} variant="contained">
            Save
          </SaveButton>
        </form>
      ) : (
        <p>Description</p>
      )}
      {isEditing ? null : <EditIcon onClick={() => setEditing(true)} />}
    </Wrapper>
  );
};
