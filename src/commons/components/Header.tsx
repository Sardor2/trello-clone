import { Box, styled, Typography } from "@mui/material";
import React from "react";

const HeaderContainer = styled(Box)(({ theme }) => ({
  textAlign: "center"
}));

const Header = () => {
  return (
    <HeaderContainer>
      <Typography variant="h5">Kanban Board</Typography>
    </HeaderContainer>
  );
};

export { Header };
