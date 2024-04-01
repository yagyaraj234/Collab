"use server";
import { db } from "@/lib/db";

export async function getBoard() {
  const res = await db.board.findMany();
  // console.log(res);
  return res;
}
