import { useAuthGlobalStore } from '@/store/useAuthGlobalStore';
import {
  Button,
  CardContainer,
  Typography,
  LucideIcons,
  Avatar,
} from '@e-burgos/tucu-ui';

interface ProfileCardProps {
  userInitials: string;
  fullName: string;
  email?: string;
  isEditing: boolean;
  onEditClick: () => void;
  onUploadAvatarClick: () => void;
}

export const ProfileCard = ({
  userInitials,
  fullName,
  email,
  isEditing,
  onEditClick,
  onUploadAvatarClick,
}: ProfileCardProps) => {
  const { user } = useAuthGlobalStore();
  return (
    <CardContainer className="flex flex-col h-auto p-4 border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex flex-col items-center text-center shrink-0">
        {/* Avatar */}
        <div className="relative mb-3">
          {user?.avatar ? (
            <Avatar
              image={user.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
              size="lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-brand to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {userInitials}
            </div>
          )}
          {isEditing && (
            <button
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
              onClick={onUploadAvatarClick}
              type="button"
            >
              <LucideIcons.Camera className="w-4 h-4" />
            </button>
          )}
        </div>

        <Typography
          tag="h2"
          className="text-xl font-bold text-gray-900 dark:text-white mb-1"
        >
          {fullName}
        </Typography>
        <Typography
          tag="p"
          className="text-sm text-gray-600 dark:text-gray-400 mb-3"
        >
          {email}
        </Typography>

        {!isEditing && (
          <Button
            type="button"
            variant="solid"
            color="primary"
            size="medium"
            onClick={onEditClick}
            className="w-full"
          >
            <LucideIcons.Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>
    </CardContainer>
  );
};
