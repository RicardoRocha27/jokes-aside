import { Post } from "@prisma/client";
import { create } from "zustand";

interface UseCommentModalStore {
  isOpen: boolean;
  profileId: string;
  post?: Post;
  onOpen: (profileId: string, post: Post) => void;
  onClose: () => void;
}

export const useCommentModal = create<UseCommentModalStore>((set) => ({
  profileId: "",
  post: undefined,
  isOpen: false,
  onOpen: (profileId, post) =>
    set({ isOpen: true, profileId: profileId, post: post }),
  onClose: () => set({ isOpen: false }),
}));
