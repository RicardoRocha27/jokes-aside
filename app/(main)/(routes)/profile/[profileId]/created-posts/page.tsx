import { getPosts } from "@/actions/get-posts";
import PostList from "@/components/post-list";

import NoPosts from "../components/no-posts";

const CreatedPostsPage = async ({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) => {
  const posts = await getPosts({
    createdPosts: true,
    profileId: (await params).profileId,
  });

  return (
    <>
      {posts.length !== 0 ? (
        <PostList initialData={posts} canEdit />
      ) : (
        <NoPosts />
      )}
    </>
  );
};

export default CreatedPostsPage;
