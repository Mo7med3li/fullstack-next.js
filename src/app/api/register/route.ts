import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email || !body.password || !body.firstName || !body.lastName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in exist" },
        { status: 409 }
      );
    }

    const user = await db.user.create({
      data: {
        email: body.email,
        password: await hashPassword(body.password),
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });

    const jwt = await createJWT(user);

    const cookie = serialize(process.env.COOKIE_NAME!, jwt, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const res = NextResponse.json({}, { status: 201 });
    res.headers.set("Set-Cookie", cookie);

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
