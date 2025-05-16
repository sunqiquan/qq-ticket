import db from "@/app/db";
import { Result } from "@/app/types";
import { User } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(
  req: NextRequest,
  { params }: Props
): Promise<NextResponse<Result<User | null>>> {
  const id = parseInt((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ code: 404, msg: "User not found" });
  }

  const user = await await db.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ code: 404, msg: "User not found" });
  }

  const body = await req.json();
  if (body?.password && body.password !== "") {
    body.password = await bcrypt.hash(body.password, 10);
  } else {
    delete body.password;
  }

  if (body.username !== user.username) {
    const duplicateUser = await db.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (duplicateUser) {
      return NextResponse.json({ code: 400, msg: "Duplicate username" });
    }
  }

  const updateUser = await db.user.update({
    where: { id },
    data: { ...body },
  });

  return NextResponse.json({ code: 200, msg: "success", data: updateUser });
}

export async function DELETE(
  req: NextRequest,
  { params }: Props
): Promise<NextResponse<Result<User | null>>> {
  const id = parseInt((await params).id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ code: 404, msg: "User not found" });
  }

  const user = await await db.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ code: 404, msg: "User not found" });
  }

  await await db.user.delete({ where: { id } });
  return NextResponse.json({ code: 200, msg: "success" });
}
