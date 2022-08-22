import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import authReducer from "./auth/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       auth: authReducer,
//     },
//   });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export type AppStore = ReturnType<typeof makeStore>;

// export const wrapper = createWrapper<AppStore>(makeStore);
