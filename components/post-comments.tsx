"use client";

import { Comment, Post } from "@prisma/client";
import { cn } from "@/lib/utils";

import { usePostCommentsModal } from "@/hooks/use-post-comments-modal";

interface PostCommentsProps {
  post: Post;
  comments: Comment[];
  loggedUser: any;
}

const PostComments: React.FC<PostCommentsProps> = ({
  post,
  comments,

  loggedUser,
}) => {
  const postCommentsModal = usePostCommentsModal();

  return (
    <div className={cn("w-full mt-5", comments.length > 0 && "cursor-pointer")}>
      {comments.length > 0 ? (
        <p
          className="text-xs text-muted-foreground"
          onClick={() => {
            postCommentsModal.onOpen(comments, post, loggedUser);
          }}
        >
          Check all comments
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">No comments </p>
      )}
    </div>
  );
};

export default PostComments;
