import { useState } from 'react';
import { Modal, Button, Typography, LucideIcons } from '@e-burgos/tucu-ui';
import { useModalStore } from '@/store/useModalStore';

export const Enable2FAModal = () => {
  const { isEnable2FAModalOpen, closeEnable2FAModal } = useModalStore();
  const [isEnabling, setIsEnabling] = useState(false);
  const [step, setStep] = useState<'info' | 'qr' | 'verify'>('info');

  const handleEnable = async () => {
    setIsEnabling(true);
    try {
      // Simulate API call to generate QR code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep('qr');
    } catch (error) {
      console.error('Error enabling 2FA:', error);
    } finally {
      setIsEnabling(false);
    }
  };

  const handleVerify = async () => {
    setIsEnabling(true);
    try {
      // Simulate API call to verify and enable 2FA
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Here you would verify the code and enable 2FA
      console.log('2FA enabled successfully');
      closeEnable2FAModal();
      setStep('info');
    } catch (error) {
      console.error('Error verifying 2FA:', error);
    } finally {
      setIsEnabling(false);
    }
  };

  const handleClose = () => {
    setStep('info');
    setIsEnabling(false);
    closeEnable2FAModal();
  };

  return (
    <Modal
      isOpen={isEnable2FAModalOpen}
      setIsOpen={(open) => {
        if (!open) {
          handleClose();
        }
      }}
      text={{
        title: 'Enable Two-Factor Authentication',
        button: step === 'qr' ? 'Verify & Enable' : 'Continue',
        backButton: 'Cancel',
      }}
      hideButtons={true}
      onClose={handleClose}
      onSubmit={step === 'qr' ? handleVerify : handleEnable}
    >
      <div className="space-y-4">
        {step === 'info' && (
          <>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Two-factor authentication adds an extra layer of security to your
              account. You'll need to use an authenticator app to generate codes
              when signing in.
            </Typography>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <LucideIcons.Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <Typography
                    tag="p"
                    className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1"
                  >
                    How it works
                  </Typography>
                  <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
                    <li>
                      Download an authenticator app (Google Authenticator,
                      Authy, etc.)
                    </li>
                    <li>Scan the QR code we'll show you</li>
                    <li>Enter the verification code to complete setup</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="ghost"
                color="primary"
                size="medium"
                onClick={handleClose}
                disabled={isEnabling}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="medium"
                onClick={handleEnable}
                disabled={isEnabling}
              >
                {isEnabling ? (
                  <>
                    <LucideIcons.Loader className="w-4 h-4 mr-2 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    <LucideIcons.Shield className="w-4 h-4 mr-2" />
                    Continue
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        {step === 'qr' && (
          <>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Scan this QR code with your authenticator app, then enter the
              verification code below.
            </Typography>

            <div className="flex justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <Typography
                  tag="p"
                  className="text-xs text-gray-500 dark:text-gray-400 text-center"
                >
                  QR Code Placeholder
                  <br />
                  (In production, this would be a real QR code)
                </Typography>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <LucideIcons.AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
                <Typography
                  tag="p"
                  className="text-xs text-yellow-800 dark:text-yellow-300"
                >
                  Make sure to save your backup codes in a safe place. You'll
                  need them if you lose access to your authenticator app.
                </Typography>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="ghost"
                color="primary"
                size="medium"
                onClick={() => setStep('info')}
                disabled={isEnabling}
              >
                Back
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="medium"
                onClick={handleVerify}
                disabled={isEnabling}
              >
                {isEnabling ? (
                  <>
                    <LucideIcons.Loader className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <LucideIcons.Check className="w-4 h-4 mr-2" />
                    Verify & Enable
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
