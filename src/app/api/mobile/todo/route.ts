import prisma from "@/db";
import { todoCreateSchema, todoSchema, todoUpdateSchema } from "@/lib/zod/todoSchema";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.todo.findMany({
      where: {
        userId: 2
      }
    })
    if (!result)
      throw new Error("Invalid user Session");
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ msg: "Error Occur", error: (error as Error).message })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { success, data, error } = todoCreateSchema.safeParse(body);
    if (!success) {
      throw new Error("Invalid body inputs", error)
    }
    if (!data.description)
      data.description = "";
    const result = await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        labelId: data.labelId,
        userId: 2
      }
    })
    if (!result)
      throw new Error("Invalid session");
    return NextResponse.json({ ...result })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Internal Server Error", error: (error as Error).message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { success, data } = todoUpdateSchema.safeParse(body);
    if (!success)
      throw new Error("Invalid body inputs")
    if (!data.description)
      data.description = "";
    const result = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        labelId: data.labelId,
      }
    })

    if (!result)
      throw new Error("Invalid session");

    return NextResponse.json({ ...result })
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error: (error as Error).message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body: Todo = await req.json();
    const { success, data } = todoSchema.safeParse(body);
    if (!success)
      throw new Error("Invalid Input")
    const result = await prisma.todo.delete({
      where: {
        id: data.id
      }
    })
    if (!result)
      throw new Error("Invalid user session")
    return NextResponse.json({
      ...result
    })
  } catch (error) {
    return NextResponse.json({ msg: "Internal server Error", error: (error as Error).message })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body: Todo = await req.json();
    const { success, data, error } = todoSchema.safeParse(body);
    if (!success) {
      console.log(error)
      throw new Error("Invalid Input")
    }

    const result = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        completed: !data.completed
      }
    })

    if (!result)
      throw new Error("Invalid user session")
    return NextResponse.json({
      msg: "Mark state Done",
      result: result.completed
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Internal server Error", error: (error as Error).message })
  }
}