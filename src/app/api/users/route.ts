import db from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ code: 401, msg: "Unauthorized" });
  }

  const body = await req.json();
  const duplicateUser = await db.user.findUnique({
    where: {
      username: body.username,
    },
  });
  if (duplicateUser) {
    return NextResponse.json({ code: 400, msg: "User already exists" });
  }

  body.password = await bcrypt.hash(body.password, 10);
  const user = await db.user.create({ data: { ...body } });
  return NextResponse.json({ code: 200, msg: "success", data: user });
}
