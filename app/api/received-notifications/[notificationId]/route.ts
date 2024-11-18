import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: { notificationId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.notificationId) {
      return new NextResponse("Notification Id is required", { status: 400 });
    }

    const notification = await db.notification.deleteMany({
      where: {
        id: params.notificationId,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.log("[NOTIFICATION_DELETE]", error);
  }
}
