import {
  Button,
  Checkbox,
  Form,
  FormField,
  Input,
  Select,
  Typography,
  ReactRouter,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import {
  SignUpFormValues,
  defaultValues,
  formValidations,
} from './validations';
import { useFlagOptions } from '@/hooks/useFlagOptions';
import { ROUTES } from '@/router/routes-config';
import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';

const SignUpForm = () => {
  const navigate = ReactRouter.useNavigate();
  const { setUser } = useAuthGlobalStore();
  const { options: countryOptions } = useFlagOptions();

  const handleSubmit = (values: SignUpFormValues) => {
    setUser({
      email: values.email,
      currentPassword: values.password,
      phoneNumber: values.phoneNumber,
      countryCode: values.countryCode,
      firstName: values.firstName,
      lastName: values.lastName,
      acceptTerms: values.acceptTerms,
    });
    navigate(ROUTES.Authentication.VerifyPhone);
  };

  return (
    <div className="flex flex-col justify-center space-y-4 h-full w-full max-w-md">
      {/* Title */}
      <div className="text-center">
        <Typography tag="h2" fontFamily="default" className="font-bold">
          Sign up
        </Typography>
      </div>

      {/* Form */}
      <Form<SignUpFormValues>
        onSubmit={handleSubmit}
        validationSchema={formValidations}
        useFormProps={{
          defaultValues,
          mode: 'onChange',
        }}
      >
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
            {/* First Name Input */}
            <FormField<SignUpFormValues> name="firstName">
              <Input
                type="text"
                placeholder="First Name"
                variant="solid"
                icon={<LucideIcons.UserIcon size={16} />}
              />
            </FormField>

            {/* Last Name Input */}
            <FormField<SignUpFormValues> name="lastName">
              <Input
                type="text"
                placeholder="Last Name"
                variant="solid"
                icon={<LucideIcons.UserIcon size={16} />}
              />
            </FormField>
          </div>

          {/* Email Input */}
          <FormField<SignUpFormValues> name="email">
            <Input
              type="email"
              placeholder="Email"
              variant="solid"
              icon={<LucideIcons.MailIcon size={16} />}
            />
          </FormField>
          {/* Phone Number Input with Country Code */}
          <div className="flex items-start justify-center gap-2 w-full">
            <FormField<SignUpFormValues>
              name="countryCode"
              className="w-24 sm:w-28"
            >
              <Select options={countryOptions} variant="solid" />
            </FormField>
            <FormField<SignUpFormValues> name="phoneNumber" className="flex-1">
              <Input
                type="tel"
                placeholder="Enter your mobile number"
                variant="solid"
                icon={<LucideIcons.PhoneIcon size={16} />}
              />
            </FormField>
          </div>

          {/* Password Input */}
          <FormField<SignUpFormValues> name="password">
            <Input
              type="password"
              placeholder="Password"
              variant="solid"
              icon={<LucideIcons.LockKeyholeIcon size={16} />}
            />
          </FormField>

          {/* Confirm Password Input */}
          <FormField<SignUpFormValues> name="confirmPassword">
            <Input
              type="password"
              placeholder="Confirm password"
              variant="solid"
              icon={<LucideIcons.LockKeyholeIcon size={16} />}
            />
          </FormField>
        </div>

        {/* Terms and Conditions Checkbox */}
        <FormField<SignUpFormValues> name="acceptTerms">
          <Checkbox
            variant="ghost"
            shape="rounded"
            label={
              <span className="text-sm">
                I agree to the{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle User Agreement click
                  }}
                >
                  User Agreement
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle Privacy Policy click
                  }}
                >
                  Privacy Policy
                </button>
              </span>
            }
            containerClassName="items-start"
            labelClassName="text-sm"
          />
        </FormField>

        <div className="space-y-2">
          <Button type="submit" size="large" fullWidth>
            Sign up
          </Button>
          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate(ROUTES.Authentication.Login)}
                className="text-primary font-bold hover:cursor-pointer hover:underline"
              >
                Log in now
              </button>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
