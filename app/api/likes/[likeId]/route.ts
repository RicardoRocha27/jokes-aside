import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ likeId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const p = await params;

    if (p.likeId) {
      return new NextResponse("Like Id is required", { status: 400 });
    }

    const like = await db.like.deleteMany({
      where: {
        id: p.likeId,
      },
    });

    return NextResponse.json(like);
  } catch (error) {
    console.log("[LIKE_DELETE]", error);
  }
}
