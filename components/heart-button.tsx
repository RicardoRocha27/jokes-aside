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

  const handleLike = async () => {
    try {
      await axios.post(`/api/likes`, { profileId, postId });

      setHasLiked(true);
      setPostLikes(postLikes + 1);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.delete(`/api/likes/${like?.id}`);

      setHasLiked(false);
      setPostLikes(postLikes - 1);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="cursor-pointer flex flex-row items-center gap-x-2">
      {hasLiked ? (
        <div onClick={handleUnlike}>
          <AiFillHeart />
        </div>
      ) : (
        <div onClick={handleLike}>
          <AiOutlineHeart />
        </div>
      )}
      <p className="text-xs">{`${postLikes} ${
        postLikes === 1 ? "laugh" : "laughs"
      }`}</p>
    </div>
  );
};

export default HeartButton;
