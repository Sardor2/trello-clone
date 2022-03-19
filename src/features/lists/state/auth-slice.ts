import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IUser } from "commons";
import { getUserFromLocalStorage } from "commons/utils";

const initialState: {
  isLoggedIn: boolean;
  user: null | IUser;
} = (() => {
  const user = getUserFromLocalStorage();
  return {
    isLoggedIn: !!user,
    user,
  };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    setAuthCredentials(state, action: PayloadAction<IUser>) {
      if (action.payload) {
        state.user = action.payload;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// actions
export const { login, logout, setAuthCredentials } = authSlice.actions;

// Selectors
const selectAuth = (state: RootState) => state.auth;
export const selectUserMe = createSelector(selectAuth, (auth) => auth.user);
export const selectIsLogged = createSelector(
  selectAuth,
  (auth) => auth.isLoggedIn
);

export const selectUserMeName = createSelector(
  selectUserMe,
  (userMe) => userMe?.name
);
export const selectUserMeEmail = createSelector(selectUserMe, (u) => u?.email);
export const selectUserMeId = createSelector(selectUserMe, (u) => u?.id);
export const selectUserMeProfilePhoto = createSelector(
  selectUserMe,
  (u) => u?.profilePhoto
);

export default authSlice;
