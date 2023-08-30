import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { title, description, tag } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!tag) {
      return new NextResponse("Tag is required", { status: 400 });
    }

    const post = await db.post.create({
      data: {
        title,
        description,
        tag,
        profileId: user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POSTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
