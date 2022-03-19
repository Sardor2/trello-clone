import { Box, Button, styled } from "@mui/material";
import { IUser, useAppDispatch } from "commons";
import Center from "commons/components/Center";
import { saveUserToStorage } from "commons/utils";
import { login, setAuthCredentials } from "features/lists/state/auth-slice";
import { firebaseLogout, signInWithGoogle } from "firebase-config";
import React from "react";
import { batch } from "react-redux";

const StyledButton = styled(Button)`
  font-weight: bold;
`;

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    signInWithGoogle().then((user) => {
      batch(() => {
        dispatch(login());
        dispatch(setAuthCredentials(user));
      });
      saveUserToStorage(user);
    });
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      minHeight={"100vh"}
    >
      <StyledButton
        onClick={handleLogin}
        disableElevation
        size="large"
        variant="contained"
      >
        Sign In{" "}
      </StyledButton>
    </Box>
  );
};

export default LoginScreen;
