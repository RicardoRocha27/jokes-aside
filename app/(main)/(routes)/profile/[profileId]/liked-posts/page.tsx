import { getPosts } from "@/actions/get-posts";
import PostList from "@/components/post-list";
import { db } from "@/lib/db";

const LikedPostsPage = async ({
  params,
}: {
  params: { profileId: string };
}) => {
  const posts = await getPosts({
    likedPosts: true,
    profileId: params.profileId,
  });

  return (
    <>
      <PostList initialData={posts} />
    </>
  );
};

export default LikedPostsPage;
