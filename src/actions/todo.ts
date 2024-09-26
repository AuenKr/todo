"use server"

import prisma from "@/db";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth"

export async function getTodo() {
  const session = await getServerSession();
  if (!session?.user)
    return []
  const data = await prisma.todo.findMany({
    where: {
      User: {
        email: session.user.email || ""
      }
    }
  })
  return data;
}

export async function createTodo(title: string, labelId: number, description: string = "") {
  const session = await getServerSession();
  if (!session?.user)
    return null;

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email || ""
    },
    select: {
      id: true,
      labels: true,
    }
  })

  if (!user || !labelId)
    return null;

  const data = await prisma.todo.create({
    data: {
      title: title,
      description: description,
      userId: user.id,
      labelId: labelId
    }
  })
  return data;
}

export async function markTodoState(todo: Todo) {
  const session = await getServerSession();
  if (!session?.user)
    return null;

  console.log("curr val ", todo.completed)
  const result = await prisma.todo.update({
    where: {
      id: todo.id
    },
    data: {
      completed: !todo.completed
    }
  })
  console.log("update value", result.completed)
  return result.completed
}

export async function deleteTodo(todo: Todo) {
  const session = await getServerSession();
  if (!session?.user)
    return null;

  const result = await prisma.todo.delete({
    where: {
      id: todo.id
    }
  })
  return result;
}

export async function updateTodo(id: number, title: string, labelId: number, description: string = "") {
  const session = await getServerSession();
  if (!session?.user)
    return null;

  const result = await prisma.todo.update({
    where: {
      id: id
    },
    data: {
      title: title,
      labelId: labelId,
      description: description
    }
  })
  return result
}