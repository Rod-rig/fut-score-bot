import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1),
    email: z.email().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword);

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
