import { useState } from 'react';
import { Typography, Form, LucideIcons } from '@e-burgos/tucu-ui';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';
import {
  ProfileCard,
  AccountInformationCard,
  PersonalInformationForm,
  ContactInformationForm,
  ProfessionalInformationForm,
  SecuritySettingsCard,
  ChangePasswordModal,
  Enable2FAModal,
  DangerZoneCard,
  LogoutConfirmModal,
  UploadAvatarModal,
} from '../features';
import {
  ProfileFormValues,
  getDefaultValues,
  formValidations,
} from '../forms/profile-form-validations';
import { useFlagOptions } from '../hooks/useFlagOptions';
import { useModalStore } from '../store/useModalStore';

const InitialPage = () => {
  const { user, setUser } = useAuthGlobalStore();
  const {
    openChangePasswordModal,
    openEnable2FAModal,
    openLogoutConfirmModal,
    openUploadAvatarModal,
  } = useModalStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { options: countryOptions } = useFlagOptions();

  // Handle form submit
  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user in store with partial update
    setUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      countryCode: values.countryCode,
      bio: values.bio,
      address: values.address,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      occupation: values.occupation,
      company: values.company,
      education: values.education,
    });

    setIsSaving(false);
    setIsEditing(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  const fullName = user
    ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'
    : 'User';

  const userInitials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() ||
      user.email[0].toUpperCase()
    : 'U';

  // Account stats
  const accountStats = [
    {
      label: 'Member Since',
      value: 'Jan 2024',
      icon: <LucideIcons.Calendar className="w-5 h-5" />,
    },
    {
      label: 'Total Orders',
      value: '24',
      icon: <LucideIcons.ShoppingCart className="w-5 h-5" />,
    },
    {
      label: 'Account Status',
      value: 'Active',
      icon: <LucideIcons.CheckCircle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6">
        <Typography
          tag="h1"
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2"
        >
          User Profile
        </Typography>
        <Typography tag="p" className="text-gray-600 dark:text-gray-400">
          Manage your personal information and account settings
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-1 flex flex-col">
          <ProfileCard
            userInitials={userInitials}
            fullName={fullName}
            email={user?.email}
            isEditing={isEditing}
            onEditClick={() => setIsEditing(true)}
            onUploadAvatarClick={openUploadAvatarModal}
          />

          <AccountInformationCard stats={accountStats} />
        </div>

        {/* Right Column - Profile Details */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <Form<ProfileFormValues>
            onSubmit={handleSubmit}
            validationSchema={formValidations}
            useFormProps={{
              defaultValues: getDefaultValues(user),
              mode: 'onChange',
            }}
          >
            <PersonalInformationForm
              isEditing={isEditing}
              onEditClick={() => setIsEditing(true)}
            />

            <ProfessionalInformationForm
              isEditing={isEditing}
              onEditClick={() => setIsEditing(true)}
            />

            <ContactInformationForm
              isEditing={isEditing}
              isSaving={isSaving}
              countryOptions={countryOptions}
              onEditClick={() => setIsEditing(true)}
              onCancel={handleCancel}
            />
          </Form>

          <SecuritySettingsCard
            onChangePasswordClick={openChangePasswordModal}
            onEnable2FAClick={openEnable2FAModal}
          />

          <DangerZoneCard onLogoutClick={openLogoutConfirmModal} />
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal />
      <Enable2FAModal />
      <LogoutConfirmModal />
      <UploadAvatarModal />
    </div>
  );
};

export default InitialPage;
