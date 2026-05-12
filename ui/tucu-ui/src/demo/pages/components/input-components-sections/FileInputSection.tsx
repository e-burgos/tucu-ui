import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  FileInput,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const FileInputSection: React.FC = () => {
  const fileInputColors = [
    { label: 'Primary', color: 'primary' as const },
    { label: 'Secondary', color: 'secondary' as const },
    { label: 'Danger', color: 'danger' as const },
    { label: 'Info', color: 'info' as const },
    { label: 'Success', color: 'success' as const },
    { label: 'Warning', color: 'warning' as const },
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
        <CardTitle title="Colors" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fileInputColors.map(({ label, color }) => (
                <CardContainer key={color} className="p-4">
                  <Typography tag="h5" className="mb-3">
                    {label}
                  </Typography>
                  <FileInput
                    label={`Upload ${label}`}
                    color={color}
                    accept="img"
                    placeholderText="PNG, JPG, GIF, WEBP. Max 100mb."
                  />
                </CardContainer>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="FileInput"
        defaultValues={{
          label: 'Upload Assets',
          accept: 'img',
          multiple: false,
          disabled: false,
          color: 'primary',
          placeholderText: 'PNG, JPG, GIF or PDF. Max 100mb.',
        }}
        includeProps={[
          'label',
          'accept',
          'multiple',
          'disabled',
          'color',
          'placeholderText',
        ]}
        excludeProps={[
          'children',
          'containerProps',
          'additionalInputProps',
          'wrapperClassName',
          'className',
          'labelClassName',
          'containerClassName',
        ]}
      >
        {(props) => (
          <div className="w-full max-w-2xl">
            <FileInput {...props} />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="FileInput" />

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

// Colors
<FileInput accept="img" color="primary" />
<FileInput accept="img" color="secondary" />
<FileInput accept="img" color="danger" />
<FileInput accept="img" color="info" />
<FileInput accept="img" color="success" />
<FileInput accept="img" color="warning" />

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
