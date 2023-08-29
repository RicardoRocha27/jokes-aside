"use client";

import { useCommentModal } from "@/hooks/use-comment-modal";
import { Comment } from "@prisma/client";
import { MessageCircle } from "lucide-react";

interface CommentButtonProps {
  comments: number;
  postId: string;
  profileId: string;
}

const CommentButton: React.FC<CommentButtonProps> = ({
  comments,
  postId,
  profileId,
}) => {
  const commentModal = useCommentModal();

  return (
    <div className="flex flex-row items-center gap-x-2">
      <MessageCircle
        size={15}
        onClick={() => commentModal.onOpen(profileId, postId)}
        className="cursor-pointer"
      />
      <p className="text-xs">
        {comments || 0} {comments === 1 ? " comment" : " comments"}
      </p>
    </div>
  );
};

export default CommentButton;
