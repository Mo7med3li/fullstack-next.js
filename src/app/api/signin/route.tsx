// app/api/signin/route.ts
import { comparePassword, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const isValid = await comparePassword(body.password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const jwt = await createJWT(user);

    cookies().set({
      name: process.env.COOKIE_NAME!,
      value: jwt,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
