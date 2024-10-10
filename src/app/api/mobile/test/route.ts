import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    msg: "Mobile heath checkpoint"
  })
}
