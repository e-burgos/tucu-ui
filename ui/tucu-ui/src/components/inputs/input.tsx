/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  forwardRef,
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  CalendarIcon,
  ChevronRight,
  ChevronLeft,
} from '../icons';
import cn from 'classnames';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';

export type DateFormat =
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY'
  | 'YYYY/MM/DD';

export type Locale = 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | 'pt-BR';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
  variant?: 'ghost' | 'solid' | 'transparent';
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  useUppercaseLabel?: boolean;
  helperText?: string;
  suffix?: React.ReactNode;
  suffixClassName?: string;
  icon?: React.ReactNode;
  dateFormat?: DateFormat;
  locale?: Locale;
};

export const inputVariantClasses = {
  ghost:
    'transition-shadow border border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
  solid:
    'transition-colors bg-gray-200/70 hover:bg-gray-300 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
  transparent: '',
};

// Helper function to get week day labels based on locale
const getWeekDayLabels = (locale: string): string[] => {
  const date = new Date(2024, 0, 7); // Sunday, January 7, 2024
  const labels: string[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(date);
    day.setDate(date.getDate() + i);
    const dayLabel = day.toLocaleDateString(locale, { weekday: 'short' });
    labels.push(dayLabel);
  }

  return labels;
};

// Helper function to get "Today" text based on locale
const getTodayText = (locale: string): string => {
  const translations: Record<string, string> = {
    'en-US': 'Today',
    en: 'Today',
    'es-ES': 'Hoy',
    es: 'Hoy',
    'fr-FR': "Aujourd'hui",
    fr: "Aujourd'hui",
    'de-DE': 'Heute',
    de: 'Heute',
    'pt-BR': 'Hoje',
    pt: 'Hoje',
  };

  // Try exact match first
  if (translations[locale]) {
    return translations[locale];
  }

  // Try language code only (e.g., 'es' from 'es-ES')
  const languageCode = locale.split('-')[0];
  if (translations[languageCode]) {
    return translations[languageCode];
  }

  // Default to English
  return 'Today';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = 'text',
      variant = 'ghost',
      className,
      inputClassName,
      labelClassName,
      helperText,
      suffix,
      suffixClassName,
      useUppercaseLabel = false,
      icon,
      id,
      value,
      onChange,
      dateFormat = 'DD/MM/YYYY',
      locale = 'en-US',
      ...props
    },
    ref
  ) => {
    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);

    // Date picker states
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showYearPicker, setShowYearPicker] = useState(false);

    // Refs
    const calendarRef = useRef<HTMLDivElement>(null);

    // Generate unique IDs for accessibility
    const inputId = useId();
    const finalId = id || inputId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    // Build aria-describedby string
    const describedBy =
      [error ? errorId : null, helperText ? helperId : null]
        .filter(Boolean)
        .join(' ') || undefined;

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Determine actual input type
    const actualType = type === 'password' && showPassword ? 'text' : type;

    // Parse date string according to format
    const parseDate = useCallback(
      (dateString: string, format: DateFormat = dateFormat): Date | null => {
        if (!dateString || dateString.trim() === '') {
          return null;
        }

        // First, try to parse as ISO format (YYYY-MM-DD) which is always sent as value
        const isoPattern = /^(\d{4})-(\d{2})-(\d{2})$/;
        const isoMatch = dateString.match(isoPattern);
        if (isoMatch) {
          const year = parseInt(isoMatch[1], 10);
          const month = parseInt(isoMatch[2], 10);
          const day = parseInt(isoMatch[3], 10);

          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            const date = new Date(year, month - 1, day);
            // Validate the date is correct (handles invalid dates like Feb 30)
            if (
              date.getFullYear() === year &&
              date.getMonth() === month - 1 &&
              date.getDate() === day
            ) {
              return date;
            }
          }
        }

        // If not ISO format, parse according to specified format
        // Determine separator
        const separator = format.includes('/')
          ? '/'
          : format.includes('-')
          ? '-'
          : '/';
        const parts = dateString.split(separator);

        if (parts.length !== 3) {
          return null;
        }

        let day: number;
        let month: number;
        let year: number;

        switch (format) {
          case 'DD-MM-YYYY':
          case 'DD/MM/YYYY':
            day = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
            break;
          case 'MM-DD-YYYY':
          case 'MM/DD/YYYY':
            month = parseInt(parts[0], 10);
            day = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
            break;
          case 'YYYY-MM-DD':
          case 'YYYY/MM/DD':
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            day = parseInt(parts[2], 10);
            break;
          default:
            return null;
        }

        // Validate parsed values
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
          return null;
        }

        // Create date (month is 0-indexed in JavaScript Date)
        const date = new Date(year, month - 1, day);

        // Validate the date is correct (handles invalid dates like Feb 30)
        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          return null;
        }

        return date;
      },
      [dateFormat]
    );

    // Format date for display
    const formatDate = (date: Date, format: DateFormat = dateFormat) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      switch (format) {
        case 'DD-MM-YYYY':
          return `${day}-${month}-${year}`;
        case 'MM-DD-YYYY':
          return `${month}-${day}-${year}`;
        case 'YYYY-MM-DD':
          return `${year}-${month}-${day}`;
        case 'DD/MM/YYYY':
          return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
          return `${month}/${day}/${year}`;
        case 'YYYY/MM/DD':
          return `${year}/${month}/${day}`;
        default:
          return `${day}-${month}-${year}`;
      }
    };

    // Format date to ISO format (YYYY-MM-DD) for value submission
    const formatDateToISO = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    // Initialize selected date from value
    useEffect(() => {
      if (type === 'date' && value && typeof value === 'string') {
        const parsedDate = parseDate(value, dateFormat);
        if (parsedDate && !isNaN(parsedDate.getTime())) {
          setTimeout(() => {
            setSelectedDate(parsedDate);
          }, 100);
          setTimeout(() => {
            setCurrentMonth(parsedDate);
          }, 100);
        }
      } else if (type === 'date' && !value) {
        // Reset when value is cleared
        setTimeout(() => {
          setSelectedDate(null);
        }, 100);
      }
    }, [value, type, dateFormat, parseDate]);

    // Close calendar when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
        ) {
          setIsCalendarOpen(false);
        }
      };

      if (isCalendarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isCalendarOpen]);

    // Handle date selection
    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      setCurrentMonth(date);
      setIsCalendarOpen(false);

      // Create synthetic event for onChange
      // Always send date in ISO format (YYYY-MM-DD) for proper validation
      const syntheticEvent = {
        target: { value: formatDateToISO(date), name: props.name },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    };

    // Generate calendar days
    const generateCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();

      const firstDay = new Date(year, month, 1);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());

      const days = [];
      const currentDate = new Date(startDate);

      for (let i = 0; i < 42; i++) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return days;
    };

    // Navigate months
    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentMonth((prev) => {
        const newMonth = new Date(prev);
        if (direction === 'prev') {
          newMonth.setMonth(prev.getMonth() - 1);
        } else {
          newMonth.setMonth(prev.getMonth() + 1);
        }
        return newMonth;
      });
    };

    // Toggle calendar
    const toggleCalendar = () => {
      if (!props.disabled) {
        const willOpen = !isCalendarOpen;
        setIsCalendarOpen(willOpen);
        setShowYearPicker(false); // Reset year picker when opening calendar

        // When opening calendar, parse current value if exists
        if (willOpen && type === 'date' && value && typeof value === 'string') {
          const parsedDate = parseDate(value, dateFormat);
          if (parsedDate && !isNaN(parsedDate.getTime())) {
            setSelectedDate(parsedDate);
            setCurrentMonth(parsedDate);
          }
        }
      }
    };

    // Generate years array (1900 to 2100)
    const generateYears = () => {
      const years = [];
      for (let year = 1900; year <= 2100; year++) {
        years.push(year);
      }
      return years;
    };

    // Handle year selection
    const handleYearSelect = (year: number) => {
      const newDate = new Date(currentMonth);
      newDate.setFullYear(year);
      setCurrentMonth(newDate);
      setShowYearPicker(false);
    };

    // Toggle year picker
    const toggleYearPicker = () => {
      setShowYearPicker(!showYearPicker);
    };

    const handleFocusInput = () => {
      if (ref && 'current' in ref) {
        (ref.current as HTMLInputElement).focus();
      }
    };

    return (
      <div className={cn('text-sm sm:text-sm', className)}>
        <div className={cn('relative', labelClassName)}>
          {label && (
            <label
              htmlFor={finalId}
              className={cn(
                'block font-medium tracking-widest dark:text-gray-100',
                useUppercaseLabel
                  ? 'mb-[8px] uppercase sm:mb-[12px]'
                  : 'mb-[6px] ml-[6px]'
              )}
            >
              {label}
              {props.required && (
                <sup className="inline-block text-[13px] text-red-500 ltr:ml-[4px] rtl:mr-[4px]">
                  *
                </sup>
              )}
            </label>
          )}
          <div className="relative">
            <input
              type={type === 'date' ? 'text' : actualType}
              ref={ref}
              id={finalId}
              aria-describedby={describedBy}
              aria-invalid={error ? 'true' : 'false'}
              aria-required={props.required ? 'true' : undefined}
              readOnly={type === 'date'}
              value={
                type === 'date' && selectedDate
                  ? formatDate(selectedDate)
                  : value
              }
              onChange={type !== 'date' ? onChange : undefined}
              onClick={type === 'date' ? toggleCalendar : undefined}
              onTouchStart={type === 'date' ? toggleCalendar : handleFocusInput}
              {...(type !== 'date'
                ? props
                : {
                    ...props,
                    onChange: undefined,
                  })}
              className={cn(
                'block h-[40px] w-full px-[16px] py-[8px] text-sm placeholder-gray-400 transition-shadow duration-200 rounded-xl text-gray-900 dark:invalid:border-red-500 dark:invalid:text-red-600 invalid:border-red-500 invalid:text-red-600 focus:border-gray-300 focus:outline-hidden focus:ring-1 focus:ring-gray-300 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:border-gray-200 disabled:bg-muted/10 disabled:text-gray-500 disabled:cursor-not-allowed dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-600 sm:h-[48px] cursor-pointer',
                Boolean(icon) && 'pl-[40px]',
                type === 'date' ? 'pr-[48px] cursor-pointer' : '',
                type === 'password' ? 'pr-[40px]' : '',
                props.disabled ? 'bg-muted/10! cursor-not-allowed' : '',
                inputClassName,
                Boolean(suffix || icon) && 'pl-[40px]',
                inputVariantClasses[variant]
              )}
            />
            {/* Left side: icon */}
            {(suffix || icon) && (
              <span
                className={cn(
                  'w-[40px] h-[40px] flex items-center justify-center absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap leading-normal text-gray-400 dark:text-white',
                  suffixClassName
                )}
                aria-hidden="true"
              >
                {suffix || icon}
              </span>
            )}

            {/* Right side: password toggle */}
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                onTouchStart={togglePasswordVisibility}
                className="absolute top-1/2 right-[12px] -translate-y-1/2 flex items-center justify-center w-[20px] h-[20px] text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-[16px] h-[16px]" />
                ) : (
                  <EyeIcon className="w-[16px] h-[16px]" />
                )}
              </button>
            )}

            {/* Right side: date picker toggle */}
            {type === 'date' && (
              <button
                type="button"
                onClick={toggleCalendar}
                onTouchStart={toggleCalendar}
                className="absolute top-1/2 right-[12px] -translate-y-1/2 flex items-center justify-center w-[20px] h-[20px] text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none cursor-pointer"
                aria-label="Open date picker"
              >
                <CalendarIcon className="w-[16px] h-[16px]" />
              </button>
            )}
          </div>

          {/* Custom Date Picker */}
          {type === 'date' && isCalendarOpen && (
            <div
              ref={calendarRef}
              className="absolute top-full left-0 z-50 mt-[4px] w-[320px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-[16px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-[16px]">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  onTouchStart={() => navigateMonth('prev')}
                  className="p-[4px] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <ChevronLeft className="w-[16px] h-[16px] text-gray-600 dark:text-gray-400" />
                </button>

                <button
                  type="button"
                  onClick={toggleYearPicker}
                  onTouchStart={toggleYearPicker}
                  className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 px-[8px] py-[4px] rounded-md transition-colors"
                >
                  {currentMonth.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </button>

                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  onTouchStart={() => navigateMonth('next')}
                  className="p-[4px] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <ChevronRight className="w-[16px] h-[16px] text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Year Picker */}
              {showYearPicker && (
                <div className="mb-[16px]">
                  <div className="grid grid-cols-4 gap-[8px] max-h-[160px] overflow-y-auto">
                    {generateYears().map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                        onTouchStart={() => handleYearSelect(year)}
                        className={cn(
                          'text-xs p-[8px] rounded-md transition-colors',
                          {
                            'bg-blue-500 text-white hover:bg-blue-600':
                              year === currentMonth.getFullYear(),
                            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700':
                              year !== currentMonth.getFullYear(),
                          }
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Days of week - Only show when not in year picker mode */}
              {!showYearPicker && (
                <>
                  <div className="grid grid-cols-7 gap-[4px] mb-[8px]">
                    {getWeekDayLabels(locale).map((day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center py-[4px]"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-[4px]">
                    {generateCalendarDays().map((date, index) => {
                      const isCurrentMonth =
                        date.getMonth() === currentMonth.getMonth();
                      const isSelected =
                        selectedDate &&
                        date.toDateString() === selectedDate.toDateString();
                      const isToday =
                        date.toDateString() === new Date().toDateString();

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDateSelect(date)}
                          onTouchStart={() => handleDateSelect(date)}
                          className={cn(
                            'text-xs p-[8px] rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700',
                            {
                              'text-gray-400 dark:text-gray-500':
                                !isCurrentMonth,
                              'text-gray-900 dark:text-gray-100':
                                isCurrentMonth && !isSelected,
                              'bg-blue-500 text-white hover:bg-blue-600':
                                isSelected,
                              'ring-2 ring-blue-500 ring-offset-1':
                                isToday && !isSelected,
                            }
                          )}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Today button */}
                  <div className="mt-[16px] pt-[12px] border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => handleDateSelect(new Date())}
                      onTouchStart={() => handleDateSelect(new Date())}
                      className="w-full text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium py-[4px] transition-colors"
                    >
                      {getTodayText(locale)}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {error && <FieldError id={errorId} error={error} size="md" />}
        {!error && helperText && (
          <FieldHelperText id={helperId} size="md">
            {helperText}
          </FieldHelperText>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
