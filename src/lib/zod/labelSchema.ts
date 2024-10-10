import { z } from "zod";

export const labelCreateSchema = z.object({
  name: z.string()
})

export const labelUpdateSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const labelSchema = z.object({
  id: z.number(),
  name: z.string(),
  userId: z.number(),
})