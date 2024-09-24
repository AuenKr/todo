import { z } from "zod";

export const authSchema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string()
})