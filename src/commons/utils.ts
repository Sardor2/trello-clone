import { IUser } from "./models";

export const getUserFromLocalStorage = (): IUser | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

export const saveUserToStorage = (user: IUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromStorage = () => localStorage.removeItem("user");
