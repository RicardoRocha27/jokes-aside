import { getPosts } from "@/actions/get-posts";
import PostList from "@/components/post-list";

import NoPosts from "../components/no-posts";

const CreatedPostsPage = async ({
  params,
}: {
  params: { profileId: string };
}) => {
  const posts = await getPosts({
    createdPosts: true,
    profileId: params.profileId,
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
