import { Modal, Button, LucideIcons, ReactRouter } from '@e-burgos/tucu-ui';
import { useModalStore } from '@/store/useModalStore';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';
import { ROUTES } from '@/router/routes-config';

export const LogoutConfirmModal = () => {
  const { isLogoutConfirmModalOpen, closeLogoutConfirmModal } = useModalStore();
  const { logout } = useAuthGlobalStore();
  const navigate = ReactRouter.useNavigate();

  const handleLogout = () => {
    logout();
    closeLogoutConfirmModal();
    navigate(ROUTES.Authentication.Login);
  };

  return (
    <Modal
      isOpen={isLogoutConfirmModalOpen}
      setIsOpen={(open) => {
        if (!open) {
          closeLogoutConfirmModal();
        }
      }}
      text={{
        title: 'Confirm Logout',
        content:
          'Are you sure you want to sign out? You will need to log in again to access your account.',
        button: 'Logout',
        backButton: 'Cancel',
      }}
      hideButtons={true}
      onClose={closeLogoutConfirmModal}
      onSubmit={handleLogout}
    >
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="ghost"
          color="primary"
          size="medium"
          onClick={closeLogoutConfirmModal}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onClick={handleLogout}
        >
          <LucideIcons.LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </Modal>
  );
};
