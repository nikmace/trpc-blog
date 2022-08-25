import z from "zod";

export const createLikeSchema = z.object({
  userId: z.string().uuid(),
  postId: z.string().uuid(),
});
