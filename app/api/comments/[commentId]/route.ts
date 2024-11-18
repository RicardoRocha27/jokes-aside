import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const loggedUser = await currentProfile();

    if (!loggedUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.commentId) {
      return new NextResponse("Like Id is required", { status: 400 });
    }

    const post = await db.post.findFirst({
      where: {
        comments: {
          some: {
            id: params.commentId,
          },
        },
      },
      include: {
        comments: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse("Post is required", { status: 400 });
    }

    const isCommentOwner =
      post.comments.find((comment) => {
        return comment.id === p.commentId;
      })?.profileId === loggedUser.id;

    const isPostOwner = post.profileId === loggedUser.id;

    if (!isCommentOwner && !isPostOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const comment = await db.comment.delete({
      where: {
        id: p.commentId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("[LIKE_DELETE]", error);
  }
}
