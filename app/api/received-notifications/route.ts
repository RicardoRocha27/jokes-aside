import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { type, senderId, receiverId, postId, value } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!type) {
      return new NextResponse("Type is Required", { status: 400 });
    }
    if (!senderId) {
      return new NextResponse("SenderId is Required", { status: 400 });
    }
    if (!receiverId) {
      return new NextResponse("ReceiverId is Required", { status: 400 });
    }
    if (!postId) {
      return new NextResponse("PostId is Required", { status: 400 });
    }

    const notification = await db.notification.create({
      data: {
        type,
        isActive: true,
        senderId,
        receiverId,
        postId,
        value,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.log("[RECEIVED_NOTIFICATIONS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const loggedUser = await currentProfile();

    if (!userId || !loggedUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const notification = await db.notification.deleteMany({
      where: {
        receiverId: loggedUser.id,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.log("[RECEIVED_NOTIFICATIONS_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    const loggedUser = await currentProfile();
    const { isActive } = await req.json();

    if (!userId || !loggedUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (isActive === undefined) {
      return new NextResponse("isActive is required", { status: 400 });
    }

    const notification = await db.notification.updateMany({
      where: {
        receiverId: loggedUser.id,
      },
      data: {
        isActive,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.log("[RECEIVED_NOTIFICATIONS_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
