"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { Comment, Post, Profile } from "@prisma/client";
import { cn } from "@/lib/utils";

import { AlertModal } from "@/components/modals/alert-modal";
import { Separator } from "@/components/ui/separator";

interface CommentProps {
  onCard?: boolean;
  post: Post;
  profile: Profile;
  comment: Comment;
  loggedUser: any;
}

const Comment: React.FC<CommentProps> = ({
  onCard,
  post,
  profile,
  comment,
  loggedUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const time = formatDistanceToNow(comment.createdAt, { addSuffix: true });

  const isCommentOwner = comment.profileId === loggedUser.id;
  const isPostOwner = post.profileId === loggedUser.id;

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/comments/${comment.id}`);

      toast.success("Comment deleted.");

      window.location.assign("/home");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={profile.imageUrl}
            alt=""
            width={onCard ? 20 : 32}
            height={onCard ? 20 : 32}
            className="rounded-full"
          />
          <div className="flex flex-col overflow-hidden whitespace-pre">
            <p className={cn("text-sm font-medium", onCard && "text-xs")}>
              {profile.username}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
          <p>{time}</p>
          {(isPostOwner || isCommentOwner) && (
            <button
              className="cursor-pointer focus:outline-none"
              disabled={isLoading}
            >
              <Trash size={18} onClick={() => setOpen(true)} />
            </button>
          )}
        </div>
      </div>
      <div>
        <p className={cn("text-sm", onCard && "text-xs mt-1")}>
          {comment.text}
        </p>
      </div>
      {!onCard && <Separator />}
    </>
  );
};

export default Comment;
