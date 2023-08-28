"use client";

import { Like } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  profileId: string;
  postId: string;
  likes: number;
  like?: Like;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  profileId,
  postId,
  likes,
  like,
}) => {
  const [hasLiked, setHasLiked] = useState(like !== undefined);
  const [postLikes, setPostLikes] = useState(likes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/likes`, { profileId, postId });

      setHasLiked(true);
      setPostLikes(postLikes + 1);
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
