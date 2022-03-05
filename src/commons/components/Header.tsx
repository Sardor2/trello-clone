import { Box, styled, Typography } from "@mui/material";
import { AddListForm } from "features/lists/components/AddListForm";
import React from "react";

const HeaderContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  width: "100%",
  padding: "20px 10px",
  paddingRight: "50px",
  minHeight: 100,
  position: "fixed",
  justifyContent: "center",
  [".form-wrapper"]: {
    position: "absolute",
    right: 20,
  },
}));

const Header = () => {
  return (
    <HeaderContainer>
      <Typography variant="h4">Kanban Board</Typography>
      <Box className="form-wrapper" minWidth={200} ml="auto">
        <AddListForm />
      </Box>
    </HeaderContainer>
  );
};

export { Header };
