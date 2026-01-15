import { create } from 'zustand';

interface ModalState {
  isChangePasswordModalOpen: boolean;
  isEnable2FAModalOpen: boolean;
  isLogoutConfirmModalOpen: boolean;
  isUploadAvatarModalOpen: boolean;
  openChangePasswordModal: () => void;
  closeChangePasswordModal: () => void;
  openEnable2FAModal: () => void;
  closeEnable2FAModal: () => void;
  openLogoutConfirmModal: () => void;
  closeLogoutConfirmModal: () => void;
  openUploadAvatarModal: () => void;
  closeUploadAvatarModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isChangePasswordModalOpen: false,
  isEnable2FAModalOpen: false,
  isLogoutConfirmModalOpen: false,
  isUploadAvatarModalOpen: false,
  openChangePasswordModal: () =>
    set({ isChangePasswordModalOpen: true }),
  closeChangePasswordModal: () =>
    set({ isChangePasswordModalOpen: false }),
  openEnable2FAModal: () => set({ isEnable2FAModalOpen: true }),
  closeEnable2FAModal: () => set({ isEnable2FAModalOpen: false }),
  openLogoutConfirmModal: () =>
    set({ isLogoutConfirmModalOpen: true }),
  closeLogoutConfirmModal: () =>
    set({ isLogoutConfirmModalOpen: false }),
  openUploadAvatarModal: () => set({ isUploadAvatarModalOpen: true }),
  closeUploadAvatarModal: () => set({ isUploadAvatarModalOpen: false }),
}));
