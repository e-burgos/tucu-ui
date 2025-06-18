/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '../forms/input';
import Button from '../buttons/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'storybook/internal/preview-api';

export interface ForgetPasswordFormPropTypes {
  onSubmit: (email: string) => void;
  resetPinPath: string;
}

export function ForgetPasswordForm({
  resetPinPath,
  onSubmit,
}: ForgetPasswordFormPropTypes) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();
    onSubmit(email);
    navigate(resetPinPath);
  }

  return (
    <form
      noValidate
      onSubmit={(value) => handleSubmit(value)}
      className="grid grid-cols-1 gap-4"
    >
      <div>
        <p className="mb-2.5 text-left text-sm font-medium text-[#6B7280] rtl:text-right dark:text-gray-300">
          Email Address
        </p>
        <Input
          type="email"
          placeholder="Enter your email"
          inputClassName="focus:!ring-0 placeholder:text-[#6B7280] !mt-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        disabled={!email}
        onClick={() => handleSubmit(email)}
        className="mt-5 rounded-lg !text-sm uppercase tracking-[0.04em]"
      >
        Send Reset code
      </Button>
    </form>
  );
}

export default ForgetPasswordForm;
