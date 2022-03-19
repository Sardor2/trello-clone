import { Image } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  styled,
  Tooltip,
  Typography,
  useRadioGroup,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "commons/hooks";
import { removeUserFromStorage } from "commons/utils";
import { AddListForm } from "features/lists/components/AddListForm";
import {
  logout,
  selectUserMeName,
  selectUserMeProfilePhoto,
} from "features/lists/state/auth-slice";
import { firebaseLogout } from "firebase-config";
import React from "react";

const HeaderContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  width: "100%",
  padding: "20px 10px",
  paddingRight: "50px",
  minHeight: 100,
  position: "fixed",
  alignItems: "center",
  justifyContent: "space-between",
  [".form-wrapper"]: {
    position: "absolute",
    right: 20,
  },
}));

const Header = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserMeName);
  const photo = useAppSelector(selectUserMeProfilePhoto);

  const onLogout = () => {
    dispatch(logout());
    firebaseLogout();
    removeUserFromStorage();
  };

  return (
    <HeaderContainer>
      <Box alignItems={"center"} display={"flex"}>
        {/* <Typography marginRight={1}>{userName}</Typography> */}
        <Tooltip title={userName ?? ""}>
          <Avatar src={photo} />
        </Tooltip>
      </Box>
      <Typography variant="h4">Kanban Board</Typography>
      <Box minWidth={200}>
        <Button onClick={onLogout}>Log out</Button>
      </Box>
    </HeaderContainer>
  );
};

export { Header };
