import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import {
  createUserOutputSchema,
  createUserSchema,
} from "../../schema/user.schema";
import { createRouter } from "../createRouter";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { email, name } = input;
    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        /**
         * When we violate unique constraint
         */
        if (e.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        }
      }
    }
  },
});
