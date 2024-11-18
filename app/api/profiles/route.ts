import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profiles = await db.profile.findMany({
      include: {
        createdPosts: {
          include: {
            likes: true,
          },
        },
      },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    console.log("[GET_PROFILES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
