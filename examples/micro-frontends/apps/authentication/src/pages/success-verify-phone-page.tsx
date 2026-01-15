import { SuccessVerifyPhoneMessage } from '../features/success-verify-phone/components/success-message';

const SuccessVerifyPhonePage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-72px)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-light dark:bg-black rounded-xl shadow-lg p-8">
          <SuccessVerifyPhoneMessage />
        </div>
      </div>
    </div>
  );
};

export default SuccessVerifyPhonePage;
