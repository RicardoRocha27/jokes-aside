import { create } from "zustand";

interface UseProfileDescriptionModalStore {
  isOpen: boolean;
  description?: string;
  profileId: string;
  onOpen: (profileId: string, description?: string) => void;
  onClose: () => void;
}

export const useProfileDescriptioModal =
  create<UseProfileDescriptionModalStore>((set) => ({
    isOpen: false,
    description: undefined,
    profileId: "",
    onOpen: (profileId, description) =>
      set({ isOpen: true, description: description, profileId: profileId }),
    onClose: () => set({ isOpen: false }),
  }));
