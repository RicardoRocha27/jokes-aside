import { Post } from "@prisma/client";

import PostCard from "@/components/post-card";
import { getPosts } from "@/actions/get-posts";

interface PostListProps {
  initialData?: Post[];
  canEdit?: boolean;
}

const PostList: React.FC<PostListProps> = async ({ initialData, canEdit }) => {
  const posts = initialData || (await getPosts({}));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          //@ts-ignore
          profile={post.profile}
          //@ts-ignore
          likes={post.likes}
          //@ts-ignore
          comments={post.comments}
          canEdit={canEdit}
        />
      ))}
    </div>
  );
};

export default PostList;
