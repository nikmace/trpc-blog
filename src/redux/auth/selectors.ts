import { RootState } from "../store";

export const selectAuthUser = (state: RootState) => state.auth;
export const selectAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
