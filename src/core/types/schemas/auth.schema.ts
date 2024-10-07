import { z } from "zod";

export const AuthSchema = z.object({
  password: z.string().min(6),
  email: z.string().email("Invalid email address"),
});
