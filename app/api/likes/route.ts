import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { profileId, postId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!profileId) {
      return new NextResponse("Profile Id is required", { status: 401 });
    }

    if (!postId) {
      return new NextResponse("Post Id is required", { status: 401 });
    }

    const like = await db.like.create({
      data: {
        profileId,
        postId,
      },
    });

    return NextResponse.json(like);
  } catch (error) {
    console.log("[LIKES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
