import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const currentProfile = async () => {
  const { userId } = await await auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
    include: {
      receivedNotifications: {
        include: {
          post: true,
          sender: true,
        },
      },
    },
  });

  return profile;
};
