import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { Result } from "@/app/types";
import { type Ticket } from "@/generated/prisma";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(
  req: NextRequest
): Promise<NextResponse<Result<Ticket | null>>> {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json({ code: 401, msg: "Unauthorized" });
  }

  const body = await req.json();
  const ticket = await db.ticket.create({
    data: { ...body },
  });
  return NextResponse.json({ code: 200, msg: "success", data: ticket });
}
