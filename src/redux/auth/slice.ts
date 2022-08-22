import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie, deleteCookie, hasCookie } from "cookies-next";
// import { HYDRATE } from "next-redux-wrapper";

import { CtxUser } from "../../server/createContext";
import { verifyJwt } from "../../utils/jwt";

let counter = 0;
export const getAuthUserFromCookies = () => {
  const token = getCookie("token");

  counter++;
  console.log("getAuthUserFromCookies: " + counter);

  if (!token || typeof token === "boolean") {
    return {
      email: "",
      id: "",
      user: "",
      isAuthenticated: false,
    };
  }

  const verified = verifyJwt<CtxUser>(token);

  return {
    email: verified.email,
    id: verified.id,
    isAuthenticated: true,
  };
};

const logout = () => {
  deleteCookie("token", { path: "/" });
};

const { email, id, isAuthenticated } = getAuthUserFromCookies();

export interface AuthState {
  email: string;
  id: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email,
  id,
  isAuthenticated,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logoutUser: (state) => {
      logout();
      state.email = "";
      state.id = "";
      state.isAuthenticated = false;
    },
  },
  //   extraReducers: {
  //     [HYDRATE]: (state, action) => {
  //       return {
  //         ...state,
  //         ...action.payload,
  //       };
  //     },
  //   },
});

// Action creators are generated for each case reducer function
export const { setAuth, logoutUser } = authSlice.actions;

export default authSlice.reducer;
