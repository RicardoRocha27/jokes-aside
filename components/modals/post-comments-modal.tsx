import { usePostCommentsModal } from "@/hooks/use-post-comments-modal";
import { Modal } from "@/components/ui/modal";
import Comment from "@/components/comment";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  text: z.string().min(1),
});

const PostCommentsModal = () => {
  const postCommentsModal = usePostCommentsModal();

  const comments = postCommentsModal.comments;
  const post = postCommentsModal.post;
  const profile = postCommentsModal.profile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/comments", {
        text: values.text,
        profileId: profile?.id,
        postId: post?.id,
      });

      postCommentsModal.onClose();
      toast.success("Comment added.");

      window.location.assign("/home");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Modal
      title="Explore Comments"
      description="Discover a tapestry of user perspectives"
      isOpen={postCommentsModal.isOpen}
      onClose={postCommentsModal.onClose}
    >
      <div className="max-h-72 overflow-y-auto">
        <div className="space-y-4 py-2 pb-4">
          <>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                post={post!}
                //@ts-ignore
                profile={comment.profile}
                comment={comment}
                loggedUser={profile}
              />
            ))}
          </>
        </div>
      </div>
      <div className="flex items-center pt-6 gap-x-2 ">
        <Image
          //@ts-ignore
          src={profile?.imageUrl}
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center w-full gap-x-2"
          >
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="New comment"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant="ghost"
              disabled={isLoading}
              type="submit"
              className=""
            >
              <Send size={20} />
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default PostCommentsModal;
