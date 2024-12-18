import { formatDistanceToNow } from "date-fns";
import { currentProfile } from "@/lib/current-profile";
import { Comment as CommentType, Like, Post, Profile } from "@prisma/client";

import PostCardHeader from "@/components/post-card-header";
import PostEdit from "@/components/post-edit";
import HeartButton from "@/components/heart-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CommentButton from "@/components/comment-button";
import PostComments from "@/components/post-comments";
import Comment from "@/components/comment";
import { redirect } from "next/navigation";

interface PostCardProps {
  post: Post;
  profile: Profile;
  likes: Like[];
  comments: CommentType[];
  canEdit?: boolean;
}

const PostCard: React.FC<PostCardProps> = async ({
  post,
  profile,
  likes,
  comments,
  canEdit,
}) => {
  const time = formatDistanceToNow(post.createdAt, { addSuffix: true });

  const loggedUser = await currentProfile();

  if (!loggedUser) {
    return redirect("/sign-in");
  }

  const like = likes.find((like) => like.profileId === loggedUser.id);

  const isUserPost = loggedUser.id === profile.id;

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
      <CardFooter className="flex flex-col">
        <div className="w-full flex justify-between items-center">
          <div className="flex break-all w-2/3">
            <p className="text-xs tracking-wide font-semibold bg-gradient-to-r from-pink-800 via-cyan-700 to-pink-800 bg-clip-text text-transparent">
              #{post.tag[0] === "#" ? post.tag.slice(1) : post.tag}
            </p>
          </div>
          <div className="flex gap-x-3 w-full justify-end ">
            <CommentButton
              comments={comments?.length}
              post={post}
              profileId={loggedUser.id}
            />
            <HeartButton
              profileId={loggedUser.id}
              post={post}
              likes={likes.length}
              like={like}
            />
          </div>
        </div>
        <PostComments post={post} comments={comments} loggedUser={loggedUser} />
        <div className="max-h-14 mt-3 overflow-hidden w-full">
          {comments[0] !== undefined && (
            <Comment
              onCard
              post={post}
              //@ts-ignore
              profile={comments[0].profile}
              comment={comments[0]}
              loggedUser={loggedUser}
            />
          )}
        </div>
      </CardFooter>
      {canEdit && isUserPost && <PostEdit post={post} />}
    </Card>
  );
};

export default PostCard;
