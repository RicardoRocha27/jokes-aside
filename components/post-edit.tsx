"use client";

import axios from "axios";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post } from "@prisma/client";

import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePostModal } from "@/hooks/use-post-modal";
import { AlertModal } from "@/components/modals/alert-modal";
import { toast } from "react-hot-toast";

interface PostEditProps {
  post: Post;
}

const PostEdit: React.FC<PostEditProps> = ({ post }) => {
  const postModal = usePostModal();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/posts/${post.id}`);

      router.refresh();

      toast.success("Post deleted.");
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
      <CardFooter className="flex flex-col">
        <Separator className="mb-3 block w-full" />
        <div className="flex w-full justify-end gap-x-4">
          <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={() => postModal.onOpen(post)}
          >
            <p className="text-sm">Edit</p>
            <Edit size={18} />
          </div>
          <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <p className="text-sm">Delete</p>
            <Trash size={18} />
          </div>
        </div>
      </CardFooter>
    </>
  );
};

export default PostEdit;
