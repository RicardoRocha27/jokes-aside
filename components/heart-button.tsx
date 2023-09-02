"use client";

import axios from "axios";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Like, NotificationType, Post } from "@prisma/client";
import { useRouter } from "next/navigation";

interface HeartButtonProps {
  profileId: string;
  post: Post;
  likes: number;
  like?: Like;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  profileId,
  post,
  likes,
  like,
}) => {
  const [hasLiked, setHasLiked] = useState(like !== undefined);
  const [postLikes, setPostLikes] = useState(likes);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const type: NotificationType = "LIKE";

  const handleLike = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/likes`, { profileId, postId: post.id });

      if (profileId !== post.profileId) {
        await axios.post("/api/received-notifications", {
          type,
          senderId: profileId,
          receiverId: post.profileId,
          postId: post.id,
        });
      }

      setHasLiked(true);
      setPostLikes(postLikes + 1);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlike = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/likes/${like?.id}`);

      setHasLiked(false);
      setPostLikes(postLikes - 1);

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center gap-x-2">
      {hasLiked ? (
        <button onClick={handleUnlike} disabled={isLoading}>
          <AiFillHeart />
        </button>
      ) : (
        <button onClick={handleLike} disabled={isLoading}>
          <AiOutlineHeart />
        </button>
      )}
      <p className="text-xs">{`${postLikes} ${
        postLikes === 1 ? "laugh" : "laughs"
      }`}</p>
    </div>
  );
};

export default HeartButton;
