import { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  FormField,
  Input,
  Button,
  Typography,
  LucideIcons,
  useFormContext,
} from '@e-burgos/tucu-ui';
import { useModalStore } from '../../../store/useModalStore';
import {
  ChangePasswordFormValues,
  defaultValues,
  formValidations,
} from '../../../forms/change-password-validations';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';

export const ChangePasswordModal = () => {
  const { isChangePasswordModalOpen, closeChangePasswordModal } =
    useModalStore();
  const { user, setPassword } = useAuthGlobalStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    setIsSubmitting(true);
    try {
      if (user?.currentPassword !== values.currentPassword) {
        return;
      }
      setPassword(values.newPassword);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Here you would call your API to change the password
      closeChangePasswordModal();
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeChangePasswordModal();
  };

  return (
    <Modal
      isOpen={isChangePasswordModalOpen}
      setIsOpen={(open) => {
        if (!open) {
          handleClose();
        }
      }}
      text={{
        title: 'Change Password',
        button: 'Change Password',
        backButton: 'Cancel',
      }}
      hideButtons={true}
      onClose={handleClose}
    >
      <Form<ChangePasswordFormValues>
        onSubmit={handleSubmit}
        validationSchema={formValidations}
        useFormProps={{
          defaultValues,
          mode: 'onChange',
        }}
      >
        <div className="space-y-4">
          <Typography
            tag="p"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Update your password to keep your account secure. Make sure to use a
            strong password.
          </Typography>

          <ChangePasswordInput />

          <FormField<ChangePasswordFormValues> name="newPassword">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              variant="solid"
              icon={<LucideIcons.Lock className="w-4 h-4" />}
            />
          </FormField>

          <FormField<ChangePasswordFormValues> name="confirmPassword">
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your new password"
              variant="solid"
              icon={<LucideIcons.Lock className="w-4 h-4" />}
            />
          </FormField>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="ghost"
              color="primary"
              size="medium"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="solid"
              color="primary"
              size="medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LucideIcons.Loader className="w-4 h-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                <>
                  <LucideIcons.Lock className="w-4 h-4 mr-2" />
                  Change Password
                </>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

const ChangePasswordInput = () => {
  const { user } = useAuthGlobalStore();
  const {
    setError,
    watch,
    formState: { isSubmitting },
  } = useFormContext<ChangePasswordFormValues>();

  const currentPassword = watch('currentPassword');

  useEffect(() => {
    if (user && currentPassword !== user.currentPassword && !isSubmitting) {
      setError('currentPassword', {
        message: 'Please enter your current password',
      });
    }
    if (isSubmitting) {
      setError('currentPassword', { message: '' });
    }
  }, [currentPassword, user, setError, isSubmitting]);

  return (
    <FormField<ChangePasswordFormValues> name="currentPassword">
      <Input
        label="Current Password"
        type="password"
        placeholder="Enter your current password"
        variant="solid"
        icon={<LucideIcons.Lock className="w-4 h-4" />}
        error={
          currentPassword !== user?.currentPassword && !isSubmitting
            ? 'Current password is incorrect'
            : undefined
        }
      />
    </FormField>
  );
};
