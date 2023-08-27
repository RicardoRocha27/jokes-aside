import { formatDistanceToNow } from "date-fns";
import { Like, Post, Profile } from "@prisma/client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PostCardHeader from "./post-card-header";
import HeartButton from "./heart-button";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

interface PostCardProps {
  post: Post;
  profile: Profile;
  likes: Like[];
}

const PostCard: React.FC<PostCardProps> = async ({ post, profile, likes }) => {
  const time = formatDistanceToNow(post.createdAt, { addSuffix: true });

  const loggedUser = await currentProfile();

  if (!loggedUser) {
    return redirectToSignIn();
  }

  const like = likes.find((like) => like.profileId === loggedUser.id);

  return (
    <Card>
      <PostCardHeader profile={profile} time={time} />
      <CardContent>
        <Separator className="my-3" />
        <div className="flex flex-col gap-y-2">
          <p className="text-md font-bold">{post.title}</p>
          <p className="text-sm">{post.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex">
          <p className="text-xs tracking-wide font-semibold bg-gradient-to-r from-pink-800 via-cyan-700 to-pink-800 bg-clip-text text-transparent">
            #{post.tag}
          </p>
        </div>
        <HeartButton
          profileId={profile.id}
          postId={post.id}
          likes={likes.length}
          like={like}
        />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
