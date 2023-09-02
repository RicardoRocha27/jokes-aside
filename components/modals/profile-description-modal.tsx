import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useProfileDescriptioModal } from "@/hooks/use-profile-description-modal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required.",
  }),
});

const ProfileDescriptionModal = () => {
  const router = useRouter();
  const profileDescriptionModal = useProfileDescriptioModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: profileDescriptionModal.description,
    },
  });

  useEffect(() => {
    if (profileDescriptionModal.description) {
      form.reset({ description: profileDescriptionModal.description });
    }
  }, [profileDescriptionModal.description, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/profiles/${profileDescriptionModal.profileId}`,
        values
      );

      profileDescriptionModal.onClose();
      toast.success("Description edited.");

      window.location.assign(
        `/profile/${profileDescriptionModal.profileId}/created-posts`
      );
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Modal
      title="Profile description"
      description="Refine your profile description for a better impression"
      isOpen={profileDescriptionModal.isOpen}
      onClose={profileDescriptionModal.onClose}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder={form.getValues().description}
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
                  onClick={profileDescriptionModal.onClose}
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

export default ProfileDescriptionModal;
