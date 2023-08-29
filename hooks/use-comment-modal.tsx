import { create } from "zustand";

interface UseCommentModalStore {
  isOpen: boolean;
  profileId: string;
  postId: string;
  onOpen: (profileId: string, postId: string) => void;
  onClose: () => void;
}

export const useCommentModal = create<UseCommentModalStore>((set) => ({
  profileId: "",
  postId: "",
  isOpen: false,
  onOpen: (profileId, postId) =>
    set({ isOpen: true, profileId: profileId, postId: postId }),
  onClose: () => set({ isOpen: false }),
}));
