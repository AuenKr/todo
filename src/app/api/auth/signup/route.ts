import { signupUser } from "@/lib/userDemoData";
import { authSchema } from "@/lib/zod/authSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parseData = authSchema.safeParse(body);
  if (!parseData.success)
    return NextResponse.json({
      msg: "invalid parameter"
    }, { status: 404 })

  const data = parseData.data;
  const result = await signupUser(data.email, data.password, data.name);

  return NextResponse.json({
    msg: "success",
    data: result
  })
}