import { ForwardedRef, forwardRef, useState, useEffect } from 'react';
import cn from 'classnames';
import Button from '../buttons';
import Image from '../utils/image';
import { Close } from '../icons/close';
import { DocumentIcon } from '../icons/document';

export const acceptedFileType = {
  img: 'image/*',
  pdf: 'application/pdf',
  csvAndExcel:
    'text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
  imgAndPdf: 'image/*,application/pdf',
  all: 'image/*,application/pdf,text/csv,application/gzip,application/xml,application/zip,application/msword,text/plain',
};

export interface FileInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'accept' | 'children'
  > {
  /** Specify type of the files. If not provided or 'all', accepts any file type */
  accept?: 'img' | 'pdf' | 'csvAndExcel' | 'imgAndPdf' | 'all';
  /** Pass multiple files */
  multiple?: boolean;
  /** Whether disable upload */
  disabled?: boolean;
  /** Pass children to customize file item style */
  children?: React.ReactNode;
  /** Pass field label */
  label?: React.ReactNode;
  /** Set your custom text to show in upload field */
  placeholderText?: React.ReactNode;
  /** To pass additional props to the container element */
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  /** To pass additional props to the input element */
  additionalInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** Pass wrapperClassName to style the container */
  wrapperClassName?: string;
  /** Pass className to style the container */
  className?: string;
  /** Pass label className to style label */
  labelClassName?: string;
  /** Pass containerClassName to style the container */
  containerClassName?: string;
}

/** Upload component allows user to upload files either from file explorer or by dragging and dropping.
 * The component implements native HTML5 drag and drop functionality without external dependencies.
 * Here is the API documentation of Upload component. Rest of the props are same as html input field.
 * You can use props like `disabled`, `multiple`, `capture` etc.
 */

export function FileInput(
  {
    accept,
    children,
    label,
    containerProps,
    additionalInputProps,
    placeholderText,
    containerClassName,
    wrapperClassName,
    labelClassName,
    onChange,
    multiple,
    ...props
  }: React.PropsWithChildren<FileInputProps>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      // Filter files by accepted types
      const validFiles = newFiles.filter(validateFileType);
      if (validFiles.length > 0) {
        if (multiple) {
          setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
        } else {
          setUploadedFiles([validFiles[0]]);
        }
      }
    }
    if (onChange) {
      onChange(event);
    }
  };

  const validateFileType = (file: File): boolean => {
    // If accept is 'all' or not provided, accept all file types
    if (!accept || accept === 'all') {
      return true;
    }
    // TypeScript guard: accept is now guaranteed to be a valid key
    const acceptKey = accept as 'img' | 'pdf' | 'csvAndExcel' | 'imgAndPdf';
    const acceptedTypesString = acceptedFileType[acceptKey];
    if (!acceptedTypesString) {
      return true;
    }
    const acceptedTypes = acceptedTypesString.split(',');
    return acceptedTypes.some((type: string) => {
      if (type.includes('*')) {
        const baseType = type.split('/')[0];
        return file.type.startsWith(baseType + '/');
      }
      return file.type === type.trim();
    });
  };

  const handleDropFiles = (files: File[]) => {
    if (files && files.length > 0) {
      // Filter files by accepted types
      const validFiles = files.filter(validateFileType);
      if (validFiles.length > 0) {
        if (multiple) {
          setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
        } else {
          setUploadedFiles([validFiles[0]]);
        }
      }
    }
  };

  const handleNativeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleDropFiles(files);
    }
    // Call original onDrop from containerProps if it exists
    if (containerProps?.onDrop) {
      containerProps.onDrop(e);
    }
  };

  const handleNativeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Call original onDragOver from containerProps if it exists
    if (containerProps?.onDragOver) {
      containerProps.onDragOver(e);
    }
  };

  const handleNativeDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Call original onDragEnter from containerProps if it exists
    if (containerProps?.onDragEnter) {
      containerProps.onDragEnter(e);
    }
  };

  const handleNativeDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Call original onDragLeave from containerProps if it exists
    if (containerProps?.onDragLeave) {
      containerProps.onDragLeave(e);
    }
  };

  const imageFiles = uploadedFiles.filter((file) =>
    file.type.includes('image')
  );

  const getFileExtension = (fileName: string): string => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
  };

  const getFileTypeLabel = (file: File): string => {
    if (file.type.includes('pdf')) return 'PDF';
    if (file.type.includes('csv')) return 'CSV';
    if (file.type.includes('spreadsheetml') || file.type.includes('ms-excel')) {
      return 'XLSX';
    }
    if (file.type.includes('zip') || file.type.includes('gzip')) return 'ZIP';
    if (file.type.includes('xml')) return 'XML';
    if (file.type.includes('msword') || file.type.includes('wordprocessingml'))
      return 'DOC';
    if (file.type.includes('plain')) return 'TXT';
    // Check file extension for Excel files (fallback)
    const ext = getFileExtension(file.name);
    if (ext === 'XLSX' || ext === 'XLS') return ext;
    return ext || 'FILE';
  };

  const handleFileDelete = (index: number) => {
    const fileToDelete = uploadedFiles[index];
    if (fileToDelete && fileToDelete.type.includes('image')) {
      URL.revokeObjectURL(URL.createObjectURL(fileToDelete));
    }
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    if (ref && 'current' in ref && ref.current) {
      ref.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      imageFiles.forEach((file) => {
        URL.revokeObjectURL(URL.createObjectURL(file));
      });
    };
  }, [imageFiles]);

  return (
    <div
      className={cn(
        'rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6',
        wrapperClassName
      )}
    >
      <div
        className={cn(
          'hover:bg-gray-50 dark:hover:bg-gray-900/50 border border-dashed dark:hover:border-brand hover:border-brand transition-all duration-300 relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
          containerClassName
        )}
        {...containerProps}
        onDrop={handleNativeDrop}
        onDragOver={handleNativeDragOver}
        onDragEnter={handleNativeDragEnter}
        onDragLeave={handleNativeDragLeave}
      >
        <input
          ref={ref}
          title=""
          type="file"
          accept={
            accept && accept !== 'all' ? acceptedFileType[accept] : undefined
          }
          className="absolute top-0 z-10 h-full w-full opacity-0 disabled:cursor-not-allowed cursor-pointer"
          onChange={handleFileChange}
          multiple={multiple}
          {...props}
          {...additionalInputProps}
        />

        <div className="text-center">
          <p className="mb-6 text-sm tracking-tighter text-gray-600 dark:text-gray-400">
            {placeholderText || 'PNG, GIF, WEBP, MP4 or MP3. Max 100mb.'}
          </p>

          <Button
            disabled={props.disabled}
            className={cn('hover:bg-primary-500', labelClassName)}
          >
            {label || 'CHOOSE FILE'}
          </Button>
        </div>
      </div>
      {children}

      {uploadedFiles.length > 0 && (
        <div className="mt-7 flex flex-row flex-wrap gap-5">
          {uploadedFiles.map((file: File, index: number) => {
            const isImage = file.type.includes('image');
            return (
              <div
                className="relative flex items-center"
                key={`${file.name}-${index}`}
              >
                {isImage ? (
                  <figure className="relative mx-auto aspect-square w-20 overflow-hidden rounded-xl border border-gray-300 @2xl:w-32">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      priority="auto"
                      className="(max-width: 768px) 100vw"
                    />
                  </figure>
                ) : (
                  <div className="relative mx-auto w-20 @2xl:w-32 flex flex-col items-center justify-center p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800">
                    <DocumentIcon className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-2" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
                      {getFileTypeLabel(file)}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-500 text-center mt-1 truncate w-full">
                      {file.name.length > 15
                        ? `${file.name.substring(0, 15)}...`
                        : file.name}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center bg-brand text-white">
                  <Close
                    onClick={() => handleFileDelete(index)}
                    onTouchStart={() => handleFileDelete(index)}
                    className="h-2 w-2 cursor-pointer transition duration-75"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default forwardRef(FileInput);
