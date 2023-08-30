import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { likeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.likeId) {
      return new NextResponse("Like Id is required", { status: 400 });
    }

    const like = await db.like.deleteMany({
      where: {
        id: params.likeId,
      },
    });

    return NextResponse.json(like);
  } catch (error) {
    console.log("[LIKE_DELETE]", error);
  }
}
