import { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  LucideIcons,
  FileInput,
  Avatar,
} from '@e-burgos/tucu-ui';
import { useModalStore } from '../../../store/useModalStore';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';

export const UploadAvatarModal = () => {
  const { isUploadAvatarModalOpen, closeUploadAvatarModal } = useModalStore();
  const { user, setUser } = useAuthGlobalStore();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const [fileInputKey, setFileInputKey] = useState(0);

  // Sync preview with user avatar when modal opens or user avatar changes
  useEffect(() => {
    if (isUploadAvatarModalOpen && user?.avatar) {
      setPreview(user.avatar);
    }
  }, [isUploadAvatarModalOpen, user?.avatar]);

  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file'));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('File size must be less than 5MB'));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const dataURL = await convertFileToDataURL(file);
      setPreview(dataURL);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An error occurred while processing the file');
      }
      // Reset input by remounting component
      setFileInputKey((prev) => prev + 1);
    }
  };

  const handleUpload = async () => {
    if (!preview) {
      return;
    }

    setIsUploading(true);
    try {
      // Simulate API call to upload avatar
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update user with data URL string
      setUser({ avatar: preview });

      console.log('Avatar uploaded successfully');
      // Reset and close modal
      setPreview(null);
      setFileInputKey((prev) => prev + 1);
      closeUploadAvatarModal();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setPreview(user?.avatar || null);
    setFileInputKey((prev) => prev + 1);
    closeUploadAvatarModal();
  };

  const handleRemove = () => {
    setPreview(null);
    setFileInputKey((prev) => prev + 1);
  };

  return (
    <Modal
      isOpen={isUploadAvatarModalOpen}
      setIsOpen={(open) => {
        if (!open) {
          handleClose();
        }
      }}
      text={{
        title: 'Upload Profile Picture',
        content:
          'Choose an image file to upload as your profile picture. Recommended size: 200x200px or larger.',
        button: 'Upload',
        backButton: 'Cancel',
      }}
      hideButtons={true}
      onClose={handleClose}
      onSubmit={handleUpload}
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          {preview ? (
            <div className="relative">
              <Avatar
                image={preview}
                alt="Preview"
                className="w-48! h-48!"
                size="xl"
              />
              <button
                onClick={handleRemove}
                className="absolute top-0 right-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                type="button"
              >
                <LucideIcons.X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
              {/* @ts-expect-error - FileInput named export has forwardRef signature but works correctly as JSX component */}
              <FileInput
                key={fileInputKey}
                accept="img"
                size={1}
                multiple={false}
                onChange={handleFileSelect}
                placeholderText=" Drag and drop or click to select an image. JPG, PNG or GIF. Max size: 1MB"
                label={preview ? 'Change Image' : 'Select Image'}
                wrapperClassName="w-full"
                containerClassName="h-32 p-4"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="ghost"
            color="primary"
            size="medium"
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="primary"
            size="medium"
            onClick={handleUpload}
            disabled={isUploading || !preview}
          >
            {isUploading ? (
              <>
                <LucideIcons.Loader className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <LucideIcons.Upload className="w-4 h-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
