import { TRPCError } from "@trpc/server";
import {
  createPostSchema,
  deletePostSchema,
  getSinglePostSchema,
  updatePostSchema,
} from "../../schema/post.schema";
import { createRouter } from "../createRouter";

export const postRouter = createRouter()
  .mutation("create-post", {
    input: createPostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot create a post while logged out",
        });
      }

      const post = await ctx.prisma.post.create({
        data: {
          ...input,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });

      return post;
    },
  })
  .mutation("delete-post", {
    input: deletePostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot delete a post while logged out",
        });
      }

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });

      if (post?.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot delete a post which does not belong to you",
        });
      }

      const deletedPost = await ctx.prisma.post.delete({
        where: {
          id: input.postId,
        },
      });

      return deletedPost;
    },
  })
  .mutation("update-post", {
    input: updatePostSchema,
    async resolve({ ctx, input }) {
      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot update a post while logged out",
        });
      }

      const post = await ctx.prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          title: input.title,
          body: input.body,
        },
      });

      return post;
    },
  })
  .query("posts", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany();
    },
  })
  .query("single-post", {
    input: getSinglePostSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });
    },
  });
