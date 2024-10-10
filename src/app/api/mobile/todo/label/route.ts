import prisma from "@/db";
import { labelCreateSchema, labelSchema, labelUpdateSchema } from "@/lib/zod/labelSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.label.findMany({
    where: {
      userId: 2
    }
  })
  return NextResponse.json({
    data
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { success, data } = labelCreateSchema.safeParse(body);
    if (!success)
      throw new Error("Invalid body inputs")

    const result = await prisma.label.create({
      data: {
        name: data.name,
        userId: 2
      }
    })

    if (!result)
      throw new Error("Invalid session");

    return NextResponse.json({ ...result })
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error", error: (error as Error).message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { success, data } = labelUpdateSchema.safeParse(body);
    if (!success)
      throw new Error("Invalid body inputs")

    const result = await prisma.label.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name
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
    const body = await req.json();
    const { success, data } = labelSchema.safeParse(body);
    if (!success)
      throw new Error("Invalid Input")

    const result = await prisma.label.delete({
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
