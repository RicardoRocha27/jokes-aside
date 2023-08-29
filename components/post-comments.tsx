"use client";

import { Comment } from "@prisma/client";
import { cn } from "@/lib/utils";

import { usePostCommentsModal } from "@/hooks/use-post-comments-modal";

interface PostCommentsProps {
  comments: Comment[];
}

const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
  const postCommentsModal = usePostCommentsModal();

  return (
    <div className={cn("w-full mt-5", comments.length > 0 && "cursor-pointer")}>
      {comments.length > 0 ? (
        <p
          className="text-xs text-muted-foreground"
          onClick={() => {
            postCommentsModal.onOpen(comments);
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
