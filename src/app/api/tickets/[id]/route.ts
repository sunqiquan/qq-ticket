import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { type Ticket } from "@/generated/prisma";
import { Result } from "@/app/types";

interface Props {
  params: { id: string };
}

export async function PATCH(
  req: NextRequest,
  { params }: Props
): Promise<NextResponse<Result<Ticket | null>>> {
  const id = parseInt((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ code: 404, msg: "Ticket not found" });
  }

  const ticket = await await db.ticket.findUnique({ where: { id } });
  if (!ticket) {
    return NextResponse.json({ code: 404, msg: "Ticket not found" });
  }

  const body = await req.json();
  const updateTicket = await db.ticket.update({
    where: { id },
    data: { ...body },
  });

  return NextResponse.json({ code: 200, msg: "success", data: updateTicket });
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
): Promise<NextResponse<Result<Ticket | null>>> {
  const id = parseInt((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ code: 404, msg: "Ticket not found" });
  }

  const ticket = await await db.ticket.findUnique({ where: { id } });
  if (!ticket) {
    return NextResponse.json({ code: 404, msg: "Ticket not found" });
  }

  await await db.ticket.delete({ where: { id } });
  return NextResponse.json({ code: 200, msg: "success" });
}
