import z from "zod";

/**
 * User Schema
 */
export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

/**
 * One Time Password Schema
 */
export const requestOtpSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default("/"),
});

export type RequestOtpInput = z.TypeOf<typeof requestOtpSchema>;

/**
 * Verify Token Schema
 */
export const verifyOtpSchema = z.object({
  hash: z.string(),
});
