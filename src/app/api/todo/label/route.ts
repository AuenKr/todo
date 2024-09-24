import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user)
    return NextResponse.json({
      msg: "Invalid Request"
    }, { status: 404 });

  const data = await prisma.label.findMany({
    where: {
      User: {
        email: session.user.email || ""
      }
    }
  })

  return NextResponse.json({
    data
  });
}