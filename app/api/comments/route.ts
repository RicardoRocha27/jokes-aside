import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { text, profileId, postId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    if (!profileId) {
      return new NextResponse("Profile Id is required", { status: 400 });
    }

    if (!postId) {
      return new NextResponse("Post Id is required", { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        text,
        profileId,
        postId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[COMMENTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
