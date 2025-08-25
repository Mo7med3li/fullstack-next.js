import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(
      process.env.COOKIE_NAME || "__Task_app__"
    )?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await validateJWT(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    if (!body?.name || !body?.projectId) {
      return NextResponse.json(
        { error: "Task name and project ID are required" },
        { status: 400 }
      );
    }

    // Verify that the project belongs to the user
    const project = await db.project.findFirst({
      where: {
        id: body.projectId,
        ownerId: user.id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 }
      );
    }

    const task = await db.task.create({
      data: {
        name: body.name,
        description: body.description || null,
        due: body.due ? new Date(body.due) : null,
        ownerId: user.id,
        projectId: body.projectId,
        status: "NOT_STARTED",
      },
    });

    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
