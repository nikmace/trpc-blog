import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../utils/prisma";

interface ContextProps {
  req: NextApiRequest;
  res: NextApiResponse;
}

export function createContext({ req, res }: ContextProps) {
  return {
    req,
    res,
    prisma,
  };
}

export type Context = ReturnType<typeof createContext>;
