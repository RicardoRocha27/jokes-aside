import { db } from "@/lib/db";

export async function getPosts({
  createdPosts,
  likedPosts,
  profileId,
}: {
  createdPosts?: boolean;
  likedPosts?: boolean;
  profileId?: string;
}) {
  let whereClause: any = {};

  if (createdPosts) {
    whereClause = {
      ...whereClause,
      profileId: profileId,
    };
  }

  if (likedPosts) {
    whereClause = {
      ...whereClause,
      likes: {
        some: {
          profileId: profileId,
        },
      },
    };
  }

  const posts = await db.post.findMany({
    where: whereClause,
    include: {
      profile: true,
      likes: true,
      comments: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}
