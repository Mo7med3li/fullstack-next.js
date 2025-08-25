import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    // Verify that the task belongs to the user
    const task = await db.task.findFirst({
      where: {
        id: taskId,
        ownerId: user.id,
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found or access denied" },
        { status: 404 }
      );
    }

    await db.task.delete({
      where: {
        id: taskId,
      },
    });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete task error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
