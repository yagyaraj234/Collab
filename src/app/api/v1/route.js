import { NextResponse } from "next/server";

export function GET(req, res, next) {
  return NextResponse.json({ status: 200, message: "Hello from the API!" });
}
