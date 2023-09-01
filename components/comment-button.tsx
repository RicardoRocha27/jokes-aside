"use client";

import { MessageCircle } from "lucide-react";

import { useCommentModal } from "@/hooks/use-comment-modal";
import { Post } from "@prisma/client";

interface CommentButtonProps {
  comments: number;
  post: Post;
  profileId: string;
}

const CommentButton: React.FC<CommentButtonProps> = ({
  comments,
  post,
  profileId,
}) => {
  const commentModal = useCommentModal();

  return (
    <div className="flex flex-row items-center gap-x-2">
      <MessageCircle
        size={15}
        onClick={() => commentModal.onOpen(profileId, post)}
        className="cursor-pointer"
      />
      <p className="text-xs">
        {comments || 0} {comments === 1 ? " comment" : " comments"}
      </p>
    </div>
  );
};

export default CommentButton;
