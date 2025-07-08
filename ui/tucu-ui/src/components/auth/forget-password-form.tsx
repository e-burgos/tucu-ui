/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '../forms/input';
import Button from '../buttons/button';
import { Form } from '../forms/form-system';
import { FormField } from '../forms/form-system/form-field';
import { FieldValues } from 'react-hook-form';
import { Path } from 'react-hook-form/dist/types';
import { useNavigate } from 'react-router-dom';
export interface ForgetPasswordFormPropTypes<FormValues extends FieldValues> {
  onSubmit: (email: string) => void;
  resetPinPath: string;
  email: Path<FormValues>;
  setEmail: (email: string) => void;
}

export function ForgetPasswordForm<FormValues extends FieldValues>({
  resetPinPath,
  onSubmit,
  email,
  setEmail,
}: ForgetPasswordFormPropTypes<FormValues>) {
  const navigate = useNavigate();

  function handleSubmit(values: FormValues) {
    onSubmit(values[email]);
    navigate(resetPinPath);
  }

  return (
    <Form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <FormField
        name={email}
        label="Email Address"
        className="focus:ring-0! placeholder:text-[#6B7280] mt-0!"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          inputClassName="focus:ring-0! placeholder:text-[#6B7280] mt-0!"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <Button
        type="submit"
        disabled={!email}
        onClick={() => handleSubmit({ [email]: email } as FormValues)}
        className="mt-5 rounded-lg text-sm! uppercase tracking-[0.04em]"
      >
        Send Reset code
      </Button>
    </Form>
  );
}

export default ForgetPasswordForm;
