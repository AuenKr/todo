import { z } from "zod";

export const todoCreateSchema = z.object({
  title: z.string(),
  labelId: z.number(),
  description: z.string().optional(),
  deadline: z.date().optional()
})

export const todoUpdateSchema = z.object({
  id: z.number(),
  title: z.string(),
  labelId: z.number(),
  description: z.string().optional(),
  deadline: z.date().optional()
})

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  deadline: z.date().optional(),
  labelId: z.number(),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date()
})