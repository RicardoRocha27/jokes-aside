import { getPosts } from "@/actions/get-posts";
import PostList from "@/components/post-list";

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
      <PostList initialData={posts} canEdit />
    </>
  );
};

export default CreatedPostsPage;
