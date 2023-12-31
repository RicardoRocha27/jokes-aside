import { create } from "zustand";
import { Post } from "@prisma/client";

interface UsePostModalStore {
  isOpen: boolean;
  initialData?: Post;
  onOpen: (post?: Post) => void;
  onClose: () => void;
}

export const usePostModal = create<UsePostModalStore>((set) => ({
  isOpen: false,
  onOpen: (post) => set({ isOpen: true, initialData: post }),
  onClose: () => set({ isOpen: false }),
}));
