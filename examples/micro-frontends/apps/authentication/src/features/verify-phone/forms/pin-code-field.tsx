import { PinCode, useFormContext, useIsMobile } from '@e-burgos/tucu-ui';
import { VerifyPhoneFormValues } from './validations';

const PinCodeField = () => {
  const { isMobile } = useIsMobile();
  const {
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useFormContext<VerifyPhoneFormValues>();
  const code = getValues('code');

  return (
    <PinCode
      name="code"
      type="number"
      length={6}
      size={isMobile ? 'lg' : 'xl'}
      rounded="lg"
      variant="solid"
      placeholder="-"
      fullWidth
      value={code}
      error={errors.code?.message}
      onChange={(value) => {
        setValue('code', value, { shouldValidate: true });
        trigger('code');
      }}
    />
  );
};

export default PinCodeField;
