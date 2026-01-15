import {
  CardContainer,
  Typography,
  Button,
  FormField,
  Input,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { ProfileFormValues } from '@/forms/profile-form-validations';

interface ProfessionalInformationFormProps {
  isEditing: boolean;
  onEditClick: () => void;
}

export const ProfessionalInformationForm = ({
  isEditing,
  onEditClick,
}: ProfessionalInformationFormProps) => {
  return (
    <CardContainer className="flex flex-col h-auto p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <Typography
          tag="h3"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Professional Information
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
        <FormField<ProfileFormValues> name="occupation">
          <Input
            label="Occupation"
            placeholder="Enter your occupation"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Briefcase className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="company">
          <Input
            label="Company"
            placeholder="Enter your company name"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Building2 className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues>
          name="education"
          className="md:col-span-2"
        >
          <Input
            label="Education"
            placeholder="Enter your education level or degree"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.GraduationCap className="w-4 h-4" />}
          />
        </FormField>
      </div>
    </CardContainer>
  );
};
