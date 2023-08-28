import PostList from "@/components/post-list";
import { db } from "@/lib/db";

const LikedPostsPage = async ({
  params,
}: {
  params: { profileId: string };
}) => {
  const posts = await db.post.findMany({
    where: {
      likes: {
        some: {
          profileId: params.profileId,
        },
      },
    },
    include: {
      profile: true,
      likes: true,
    },
  });

  return (
    <>
      <PostList initialData={posts} />
    </>
  );
};

export default LikedPostsPage;
