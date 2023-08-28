import { db } from "@/lib/db";
import PostCard from "@/components/post-card";
import { Post } from "@prisma/client";

interface PostListProps {
  initialData?: Post[];
}

const PostList: React.FC<PostListProps> = async ({ initialData }) => {
  const posts =
    initialData ||
    (await db.post.findMany({
      include: {
        profile: true,
        likes: true,
      },
    }));

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
        />
      ))}
    </div>
  );
};

export default PostList;
