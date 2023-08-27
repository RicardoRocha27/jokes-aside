import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
}
