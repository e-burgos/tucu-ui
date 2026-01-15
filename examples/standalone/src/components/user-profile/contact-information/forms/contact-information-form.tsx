import {
  CardContainer,
  Typography,
  Button,
  FormField,
  Input,
  Select,
  LucideIcons,
  SelectOption,
} from '@e-burgos/tucu-ui';
import { ProfileFormValues } from '@/forms/profile-form-validations';

interface ContactInformationFormProps {
  isEditing: boolean;
  isSaving: boolean;
  countryOptions: SelectOption[];
  onEditClick: () => void;
  onCancel: () => void;
}

export const ContactInformationForm = ({
  isEditing,
  isSaving,
  countryOptions,
  onEditClick,
  onCancel,
}: ContactInformationFormProps) => {
  return (
    <CardContainer className="flex flex-col h-auto p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <Typography
          tag="h3"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          Contact Information
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
        <FormField<ProfileFormValues> name="countryCode">
          <Select
            label="Country Code"
            options={countryOptions}
            variant="solid"
            disabled={!isEditing}
          />
        </FormField>

        <FormField<ProfileFormValues> name="phoneNumber">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Phone className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="address">
          <Input
            label="Address"
            placeholder="Enter your street address"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.MapPin className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="city">
          <Input
            label="City"
            placeholder="Enter your city"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Building className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="state">
          <Input
            label="State/Province"
            placeholder="Enter your state or province"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Map className="w-4 h-4" />}
          />
        </FormField>

        <FormField<ProfileFormValues> name="zipCode">
          <Input
            label="Zip/Postal Code"
            placeholder="Enter your zip code"
            variant="solid"
            disabled={!isEditing}
            icon={<LucideIcons.Hash className="w-4 h-4" />}
          />
        </FormField>
      </div>

      {/* Form Actions */}
      {isEditing && (
        <div className="flex justify-end gap-2 mt-8">
          <Button
            type="button"
            variant="ghost"
            color="primary"
            size="medium"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="solid"
            color="primary"
            size="medium"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <LucideIcons.Loader className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <LucideIcons.Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      )}
    </CardContainer>
  );
};
