import { createRouter } from "../createRouter";
import { likeRouter } from "./like.router";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("posts.", postRouter)
  .merge("likes.", likeRouter);

export type AppRouter = typeof appRouter;
