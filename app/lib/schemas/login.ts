import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
