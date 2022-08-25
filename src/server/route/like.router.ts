import { TRPCError } from "@trpc/server";
import { createLikeSchema } from "../../schema/like.schema";

import { createRouter } from "../createRouter";

interface ReturnLike {
  message: string;
  success: boolean;
  likeId: string;
}

export const likeRouter = createRouter()
  .mutation("like", {
    input: createLikeSchema,
    async resolve({ ctx, input }) {
      const { userId, postId } = input;

      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot create a post while logged out",
        });
      }

      // const userLikes = await ctx.prisma.user.findUnique({
      //   where: {
      //     id: userId,
      //   },
      // });

      // console.log(userLikes);

      const like = await ctx.prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      // const allLikes = await ctx.prisma.like.findMany();
      // console.log(allLikes);

      const data: ReturnLike = {
        message: "Liked successfully",
        success: true,
        likeId: like.id,
      };

      return data;
    },
  })
  .mutation("dislike", {
    input: createLikeSchema,
    async resolve({ ctx, input }) {
      const { userId, postId } = input;

      if (!ctx.user) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot create a post while logged out",
        });
      }

      const postWithUserLike = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          likes: { where: { postId: postId, userId: userId } },
          id: true,
        },
      });

      const likeId = postWithUserLike?.likes[0].id;

      const deletedLike = await ctx.prisma.like.delete({
        where: {
          id: likeId,
        },
      });

      // const allLikes = await ctx.prisma.like.findMany();
      // console.log(allLikes);

      const data: ReturnLike = {
        message: "Disliked successfully",
        success: true,
        likeId: deletedLike.id,
      };

      return data;
    },
  })
  .mutation("test", {
    input: createLikeSchema,
    async resolve({ ctx, input }) {
      const { userId, postId } = input;
      // const userLikes = await ctx.prisma.user.findUnique({
      //   where: {
      //     id: userId,
      //   },
      // });

      const PostLikes = await ctx.prisma.post.findMany({
        where: {
          id: postId,
        },
        include: {
          likes: true,
        },
      });
      console.log("Post likes:");
      console.log(PostLikes);

      const allLikes = await ctx.prisma.like.findMany();
      console.log("All likes:");
      console.log(allLikes);
    },
  });
