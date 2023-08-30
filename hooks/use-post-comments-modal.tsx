import { create } from "zustand";
import { Comment, Post, Profile } from "@prisma/client";

interface UsePostCommentsModalStore {
  isOpen: boolean;
  post?: Post;
  comments: Comment[];
  loggedUserId: string;
  profile?: Profile;
  onOpen: (
    comments: Comment[],
    post: Post,
    loggedUserId: string,
    profile: Profile
  ) => void;
  onClose: () => void;
}

export const usePostCommentsModal = create<UsePostCommentsModalStore>(
  (set) => ({
    isOpen: false,
    post: undefined,
    comments: [],
    loggedUserId: "",
    profile: undefined,
    onOpen: (c, p, l, u) =>
      set({ isOpen: true, comments: c, post: p, loggedUserId: l, profile: u }),
    onClose: () => set({ isOpen: false }),
  })
);
