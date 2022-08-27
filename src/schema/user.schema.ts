import z, { TypeOf } from "zod";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  provider?: string;
  active?: boolean;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}
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

export const meProfileSchema = z.object({
  userId: z.string().uuid(),
});

export const updateUserSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(32),
  email: z.string().email().min(5),
  phoneNumber: z.string().optional(),
  birthday: z.string().optional(),
  organization: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const updateUserSchemaRouter = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  birthday: z.string(),
  organization: z.string(),
  imageUrl: z.string(),
  active: z.boolean().default(true),
  verified: z.boolean().default(false),
});

export type UpdateUserInput = z.TypeOf<typeof updateUserSchemaRouter>;
