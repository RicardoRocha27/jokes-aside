import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
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

    const post = await db.post.update({
      where: {
        id: params.postId,
        profileId: user.id,
      },
      data: {
        title,
        description,
        tag,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const post = await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
