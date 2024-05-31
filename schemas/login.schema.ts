import { z } from "zod";

const loginSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

export default loginSchema;

export type LoginSchema = z.infer<typeof loginSchema>;
