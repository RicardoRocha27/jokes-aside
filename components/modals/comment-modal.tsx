import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCommentModal } from "@/hooks/use-comment-modal";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NotificationType } from "@prisma/client";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Text is required.",
  }),
});

const CommentModal = () => {
  const commentModal = useCommentModal();
  const type: NotificationType = "COMMENT";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const profileId = commentModal.profileId;
      const post = commentModal.post;

      await axios.post("/api/comments", {
        text: values.text,
        profileId,
        postId: post?.id,
      });

      if (post?.profileId !== profileId) {
        await axios.post("/api/received-notifications", {
          type,
          senderId: profileId,
          receiverId: post?.profileId,
          postId: post?.id,
          value: form.getValues().text,
        });
      }

      commentModal.onClose();
      toast.success("Comment added.");

      window.location.assign("/home");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleClose = () => {
    commentModal.onClose();
    form.reset();
  };

  return (
    <Modal
      title="Comment Post"
      description="Share your thoughts with the others"
      isOpen={commentModal.isOpen}
      onClose={handleClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3"
            >
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="New comment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={commentModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
