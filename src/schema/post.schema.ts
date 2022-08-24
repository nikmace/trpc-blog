import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "Minimum title length is 5 characters")
    .max(256, "Maximum title length is 256 characters"),
  body: z.string().min(10, "Minimum body length is 10 characters"),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const getSinglePostSchema = z.object({
  postId: z.string().uuid(),
});

export const deletePostSchema = z.object({
  postId: z.string().uuid(),
});

export const updatePostSchema = z.object({
  postId: z.string().uuid(),
  title: z
    .string()
    .min(5, "Minimum title length is 5 characters")
    .max(256, "Maximum title length is 256 characters"),
  body: z.string().min(10, "Minimum body length is 10 characters"),
});

export type UpdatePostInput = CreatePostInput;
