"use client";

import CommentModal from "@/components/modals/comment-modal";
import PostCommentsModal from "@/components/modals/post-comments-modal";
import { PostModal } from "@/components/modals/post-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PostModal />
      <CommentModal />
      <PostCommentsModal />
    </>
  );
};
