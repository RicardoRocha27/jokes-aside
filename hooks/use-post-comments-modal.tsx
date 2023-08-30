import { create } from "zustand";
import { Comment, Post, Profile } from "@prisma/client";

interface UsePostCommentsModalStore {
  isOpen: boolean;
  post?: Post;
  comments: Comment[];
  profile?: Profile;
  onOpen: (comments: Comment[], post: Post, profile: Profile) => void;
  onClose: () => void;
}

export const usePostCommentsModal = create<UsePostCommentsModalStore>(
  (set) => ({
    isOpen: false,
    post: undefined,
    comments: [],
    profile: undefined,
    onOpen: (c, p, u) =>
      set({ isOpen: true, comments: c, post: p, profile: u }),
    onClose: () => set({ isOpen: false }),
  })
);
