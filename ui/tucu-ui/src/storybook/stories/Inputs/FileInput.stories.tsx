import React from 'react';
import type { Meta, StoryFn } from '@storybook/react-vite';
import { FileInput } from '../../../components/forms';
import { StoryContainer } from '../../components/StoryContainer';
import Button from '../../../components/buttons';

const meta: Meta<typeof FileInput> = {
  title: 'UI COMPONENTS/Inputs/FileInput',
  tags: ['autodocs'],
  component: FileInput,
  parameters: {
    docs: {
      description: {
        component:
          'The FileInput component allows users to upload files. It supports different file types and displays preview thumbnails for uploaded images.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the file input',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple files can be uploaded',
    },
    accept: {
      control: 'select',
      options: ['img', 'pdf', 'csv', 'imgAndPdf', 'all'],
      description: 'Accepted file types',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the component',
    },
  },
  args: {
    label: 'Upload Files',
    placeholderText: 'PNG, GIF, WEBP, MP4 or MP3. Max 100mb.',
    multiple: true,
    accept: 'img',
  },
};

export default meta;

const Template: StoryFn<typeof FileInput> = (args) => (
  <StoryContainer>
    <div className="w-full max-w-lg">
      <FileInput {...args} />
    </div>
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {};

export const SingleFile = Template.bind({});
SingleFile.args = {
  multiple: false,
  label: 'Upload Single Image',
};

export const AcceptAll = Template.bind({});
AcceptAll.args = {
  accept: 'all',
  label: 'Upload Any File',
};

export const AcceptPDF = Template.bind({});
AcceptPDF.args = {
  accept: 'pdf',
  label: 'Upload PDF Document',
};

export const AcceptImagesAndPDFs = Template.bind({});
AcceptImagesAndPDFs.args = {
  accept: 'imgAndPdf',
  label: 'Upload Images or PDFs',
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  placeholderText: 'Drop Files Here',
  label: 'or click to browse',
};

export const ProfilePhotoUpload = () => {
  return (
    <StoryContainer>
      <div className="w-full max-w-md space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Photo</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Upload a profile photo. The file should be an image (JPG, PNG, GIF).
        </p>

        <FileInput multiple={false} accept="img" label="Select Profile Photo" />

        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Save Photo
          </button>
        </div>
      </div>
    </StoryContainer>
  );
};

export const ProductGalleryUpload = () => {
  return (
    <StoryContainer>
      <div className="w-full max-w-lg space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Product Gallery</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Upload multiple images for your product gallery. You can select up to
          5 images.
        </p>

        <FileInput multiple={true} accept="img" label="Add Product Images" />

        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Upload Gallery
          </button>
        </div>
      </div>
    </StoryContainer>
  );
};

export const DocumentUpload = () => {
  return (
    <StoryContainer className="flex justify-start items-center">
      <div className="w-full max-w-lg space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Document Upload</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Upload your identification documents. Accepted formats: PDF, JPG, PNG.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Identification Card</h3>
            <FileInput
              multiple={false}
              accept="imgAndPdf"
              label="Upload ID Card"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Proof of Address</h3>
            <FileInput
              multiple={false}
              accept="imgAndPdf"
              label="Upload Proof of Address"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">
              Additional Documents (Optional)
            </h3>
            <FileInput
              multiple={true}
              accept="all"
              label="Upload Additional Documents"
            />
          </div>
        </div>

        <Button variant="ghost" size="small" className="mt-4 w-full">
          Submit Documents
        </Button>
      </div>
    </StoryContainer>
  );
};
