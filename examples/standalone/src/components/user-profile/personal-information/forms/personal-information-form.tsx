import {
  CardContainer,
  Typography,
  Button,
  FormField,
  Input,
  Textarea,
  Select,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { ProfileFormValues } from '@/forms/profile-form-validations';

interface PersonalInformationFormProps {
  isEditing: boolean;
  onEditClick: () => void;
}

const genderOptions = [
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
  { name: 'Other', value: 'other' },
  { name: 'Prefer not to say', value: 'prefer-not-to-say' },
];

const maritalStatusOptions = [
  { name: 'Single', value: 'single' },
  { name: 'Married', value: 'married' },
  { name: 'Divorced', value: 'divorced' },
  { name: 'Widowed', value: 'widowed' },
  { name: 'Prefer not to say', value: 'prefer-not-to-say' },
];

export const PersonalInformationForm = ({
  isEditing,
  onEditClick,
}: PersonalInformationFormProps) => {
  return (
    <CardContainer className="flex flex-col h-auto p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <Typography tag="h3" className="text-xl font-bold">
          Personal Information
        </Typography>
        {!isEditing && (
          <Button
            type="button"
            variant="ghost"
            color="primary"
            size="small"
            onClick={onEditClick}
          >
            <LucideIcons.Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
        <FormField<ProfileFormValues> name="firstName">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.User className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="lastName">
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.User className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="email">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Mail className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="dateOfBirth">
          <Input
            label="Date of Birth"
            type="date"
            placeholder="Select your date of birth"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Calendar className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="gender">
          <Select
            label="Gender"
            options={genderOptions}
            variant="solid"
            disabled={!isEditing}
          />
        </FormField>

        <FormField<ProfileFormValues> name="maritalStatus">
          <Select
            label="Marital Status"
            options={maritalStatusOptions}
            variant="solid"
            disabled={!isEditing}
          />
        </FormField>

        <FormField<ProfileFormValues> name="bio" className="md:col-span-2">
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            variant="solid"
            rows={3}
            disabled={!isEditing}
          />
        </FormField>
      </div>
    </CardContainer>
  );
};
