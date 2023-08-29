import { Comment } from "@prisma/client";
import { create } from "zustand";

interface UsePostCommentsModalStore {
  isOpen: boolean;
  comments: Comment[];
  onOpen: (comments: Comment[]) => void;
  onClose: () => void;
}

export const usePostCommentsModal = create<UsePostCommentsModalStore>(
  (set) => ({
    isOpen: false,
    comments: [],
    onOpen: (comm) => set({ isOpen: true, comments: comm }),
    onClose: () => set({ isOpen: false }),
  })
);
