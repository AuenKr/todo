"use server"

import prisma from "@/db";
import { Label } from "@prisma/client";
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

export async function deleteLabel(label: Label) {
  const session = await getServerSession();
  if (!session?.user)
    return null;

  const result = await prisma.label.delete({
    where: {
      id: label.id
    }
  })
  return result;
}


export async function updateLabel(id: number, name: string) {
  const session = await getServerSession();
  if (!session?.user)
    return null;

  const result = await prisma.label.update({
    where: {
      id: id
    },
    data: {
      name: name,
    }
  })
  return result
}