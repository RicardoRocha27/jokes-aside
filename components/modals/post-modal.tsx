"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { usePostModal } from "@/hooks/use-post-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Post title is required.",
  }),
  description: z.string().min(1, {
    message: "Post description is required.",
  }),
  tag: z.string().min(1, {
    message: "Post tag is required.",
  }),
});

export const PostModal = () => {
  const postModal = usePostModal();

  useEffect(() => {
    if (postModal.initialData) {
      form.reset(postModal.initialData);
    } else {
      form.reset({ title: "", description: "", tag: "" });
    }
  }, [postModal.initialData]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (postModal.initialData) {
        await axios.patch(`/api/posts/${postModal.initialData.id}`, values);

        postModal.onClose();
        toast.success("Post edited.");

        window.location.assign(
          `/profile/${postModal.initialData.profileId}/created-posts`
        );
      } else {
        await axios.post("/api/posts", values);

        postModal.onClose();
        toast.success("Post created.");

        window.location.assign("/home");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Modal
      title={postModal.initialData ? "Edit Post" : "Create Post"}
      description={
        postModal.initialData
          ? "Refine your post for impact"
          : "Add a new post to make others laugh"
      }
      isOpen={postModal.isOpen}
      onClose={postModal.onClose}
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="New post"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Post description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="#post-tag"
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
                  onClick={postModal.onClose}
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
