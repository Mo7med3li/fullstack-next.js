import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

export async function PATCH(req: NextRequest) {
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
    if (!body?.taskId || !body?.status) {
      return NextResponse.json(
        { error: "Task ID and status are required" },
        { status: 400 }
      );
    }

    // Validate status
    if (!Object.values(TASK_STATUS).includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Verify that the task belongs to the user
    const task = await db.task.findFirst({
      where: {
        id: body.taskId,
        ownerId: user.id,
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found or access denied" },
        { status: 404 }
      );
    }

    const updatedTask = await db.task.update({
      where: {
        id: body.taskId,
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({ data: updatedTask }, { status: 200 });
  } catch (error) {
    console.error("Update task status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
