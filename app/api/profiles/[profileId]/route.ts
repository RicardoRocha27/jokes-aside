import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const { userId } = await auth();
    const { description } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await currentProfile();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const profile = await db.profile.update({
      where: {
        id: (await params).profileId,
      },
      data: {
        description,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log("[POST_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
