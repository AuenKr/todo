"use server"

import prisma from "@/db";
import { getServerSession } from "next-auth";


export async function getTodoLabel() {
  const session = await getServerSession();
  if (!session?.user)
    return [];

  const data = await prisma.label.findMany({
    where: {
      User: {
        email: session.user.email || ""
      }
    }
  })

  return data;
}

export async function createTodoLabel(name: string) {
  const session = await getServerSession();
  if (!session?.user)
    return null;
  const data = await prisma.label.create({
    data: {
      name,
      User: {
        connect: {
          email: session.user.email || ""
        }
      }
    }
  })
  return data;
}