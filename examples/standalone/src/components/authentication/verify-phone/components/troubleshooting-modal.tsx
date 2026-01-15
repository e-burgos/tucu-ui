import { Button, Modal, Typography } from '@e-burgos/tucu-ui';

interface TroubleshootingModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onContactService?: () => void;
}

export const TroubleshootingModal = ({
  isOpen,
  setIsOpen,
  onContactService,
}: TroubleshootingModalProps) => {
  const handleContactService = () => {
    if (onContactService) {
      onContactService();
    } else {
      console.log('Contact Customer Service');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      text={{
        title: 'Didn’t receive your mobile verification code?',
        button: 'Okay',
      }}
      className="max-w-[400px]!"
      hideButtons
    >
      <div className="space-y-3">
        <Typography
          tag="p"
          className="text-sm font-medium"
          fontFamily="default"
        >
          Please try the following actions:
        </Typography>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Check if the email is in your spam folder</li>
          <li>Please confirm that the email address is anything@domain.com</li>
          <li>The email may be delayed. Please try again after 15 minutes</li>
        </ul>
        <div className="pt-1">
          <Typography tag="p" className="text-sm" fontFamily="default">
            Still having trouble?{' '}
            <button
              type="button"
              onClick={handleContactService}
              className="text-primary font-bold hover:cursor-pointer hover:underline"
            >
              Contact Customer Service
            </button>
          </Typography>
        </div>
        <Button
          size="large"
          className="mt-2"
          fullWidth
          onClick={() => setIsOpen(false)}
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
};
