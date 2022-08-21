import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/route/app.router";

export type TQuery = keyof AppRouter["_def"]["queries"];

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

export const UserContext = createContext<InferQueryOutput<"users.me">>(null);

interface UserCtxProviderProps {
  children: React.ReactNode;
  value: InferQueryOutput<"users.me"> | undefined;
}

export const UserCtxProvider: React.FC<UserCtxProviderProps> = ({
  children,
  value,
}) => {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserCtx = () => useContext(UserContext);
