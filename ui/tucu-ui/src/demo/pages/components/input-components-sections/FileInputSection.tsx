import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  FileInput,
} from '../../../../index';

const FileInputSection: React.FC = () => {
  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  const fileInputPropsData = [
    {
      prop: 'accept',
      type: "'img' | 'pdf' | 'csvAndExcel' | 'imgAndPdf' | 'all'",
      default: 'undefined (accepts all)',
      description:
        'File types to accept. If not provided or set to "all", accepts any file type',
    },
    {
      prop: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Allow multiple file selection',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the upload component',
    },
    {
      prop: 'label',
      type: 'React.ReactNode',
      default: "'CHOOSE FILE'",
      description: 'Button label text',
    },
    {
      prop: 'placeholderText',
      type: 'React.ReactNode',
      default: "'PNG, GIF, WEBP, MP4 or MP3. Max 100mb.'",
      description: 'Placeholder text displayed in the upload area',
    },
    {
      prop: 'children',
      type: 'React.ReactNode',
      default: '-',
      description: 'Custom content to display in the upload area',
    },
    {
      prop: 'wrapperClassName',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for the wrapper container',
    },
    {
      prop: 'className',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for the input element',
    },
    {
      prop: 'labelClassName',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for the label/button',
    },
    {
      prop: 'containerClassName',
      type: 'string',
      default: '-',
      description: 'Custom CSS classes for the container element',
    },
    {
      prop: 'containerProps',
      type: 'React.HTMLAttributes<HTMLDivElement>',
      default: '-',
      description: 'Additional props to pass to the container element',
    },
    {
      prop: 'additionalInputProps',
      type: 'React.InputHTMLAttributes<HTMLInputElement>',
      default: '-',
      description: 'Additional props to pass to the input element',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          FileInput
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          An advanced file input component with native HTML5 drag-and-drop
          support, image preview, and flexible file type validation. The
          component implements native drag and drop functionality without
          external dependencies.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Images Only
                </Typography>
                <FileInput
                  label="Upload Images"
                  accept="img"
                  placeholderText="PNG, JPG, GIF, WEBP. Max 100mb."
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Multiple Images
                </Typography>
                <FileInput
                  label="Upload Multiple Images"
                  accept="img"
                  multiple
                  placeholderText="Select multiple images"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  PDF Documents
                </Typography>
                <FileInput
                  label="Upload PDF"
                  accept="pdf"
                  placeholderText="PDF files only. Max 100mb."
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  CSV & Excel Files
                </Typography>
                <FileInput
                  label="Upload CSV or Excel"
                  accept="csvAndExcel"
                  multiple
                  placeholderText="CSV, XLSX, or XLS files. Max 100mb."
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Images & PDFs
                </Typography>
                <FileInput
                  label="Upload Images or PDFs"
                  accept="imgAndPdf"
                  multiple
                  placeholderText="Images or PDF documents"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  All File Types
                </Typography>
                <FileInput
                  label="Upload Any File"
                  accept="all"
                  multiple
                  placeholderText="Drag and drop any file type or click to browse"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Any File (No Restriction)
                </Typography>
                <FileInput
                  label="Upload Files"
                  multiple
                  placeholderText="Accept any file type - no restrictions"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Disabled
                </Typography>
                <FileInput accept="img" disabled />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable columns={propsTableColumns} data={fileInputPropsData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { FileInput } from '@e-burgos/tucu-ui';

// Images only
<FileInput
  label="Upload Images"
  accept="img"
  placeholderText="PNG, JPG, GIF, WEBP. Max 100mb."
/>

// Multiple images
<FileInput
  label="Upload Multiple Images"
  accept="img"
  multiple
  placeholderText="Select multiple images"
/>

// PDF documents
<FileInput
  label="Upload PDF"
  accept="pdf"
  placeholderText="PDF files only. Max 100mb."
/>

// CSV and Excel files
<FileInput
  label="Upload CSV or Excel"
  accept="csvAndExcel"
  multiple
  placeholderText="CSV, XLSX, or XLS files. Max 100mb."
/>

// Images and PDFs
<FileInput
  label="Upload Images or PDFs"
  accept="imgAndPdf"
  multiple
  placeholderText="Images or PDF documents"
/>

// All predefined file types
<FileInput
  label="Upload Any File"
  accept="all"
  multiple
  placeholderText="Drag and drop any file type or click to browse"
/>

// Any file type (no restrictions)
<FileInput
  label="Upload Files"
  multiple
  placeholderText="Accept any file type - no restrictions"
/>

// Disabled
<FileInput accept="img" disabled />

// Custom styling
<FileInput
  accept="img"
  wrapperClassName="custom-wrapper"
  containerClassName="custom-container"
  labelClassName="custom-label"
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default FileInputSection;
