/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useId, useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import cn from 'classnames';
import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';

export type DateFormat =
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'MM/DD/YYYY'
  | 'YYYY/MM/DD';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  useUppercaseLabel?: boolean;
  helperText?: string;
  suffix?: React.ReactNode;
  suffixClassName?: string;
  icon?: React.ReactNode;
  dateFormat?: DateFormat;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = 'text',
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
      dateFormat = 'DD-MM-YYYY',
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

    // Initialize selected date from value
    useEffect(() => {
      if (type === 'date' && value && typeof value === 'string') {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
          setCurrentMonth(date);
        }
      }
    }, [value, type]);

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

    // Handle date selection
    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      setCurrentMonth(date);
      setIsCalendarOpen(false);

      // Create synthetic event for onChange
      const syntheticEvent = {
        target: { value: formatDate(date), name: props.name },
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
        setIsCalendarOpen(!isCalendarOpen);
        setShowYearPicker(false); // Reset year picker when opening calendar
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

    return (
      <div className={cn('text-sm sm:text-sm', className)}>
        <div className={cn('relative', labelClassName)}>
          {label && (
            <label
              htmlFor={finalId}
              className={cn(
                'block font-medium tracking-widest dark:text-gray-100',
                useUppercaseLabel ? 'mb-2 uppercase sm:mb-3' : 'mb-1.5 ml-1.5'
              )}
            >
              {label}
              {props.required && (
                <sup className="inline-block text-[13px] text-red-500 ltr:ml-1 rtl:mr-1">
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
              {...(type !== 'date' ? props : { ...props, onChange: undefined })}
              className={cn(
                'mt-1 block h-10 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 transition-shadow duration-200 dark:invalid:border-red-500 dark:invalid:text-red-600 invalid:border-red-500 invalid:text-red-600 focus:border-gray-300 focus:outline-hidden focus:ring-1 focus:ring-gray-300 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:focus:border-gray-600 dark:focus:ring-gray-600 sm:h-12 sm:rounded-lg cursor-pointer',
                icon && 'pl-10',
                type === 'date' && 'pr-12 cursor-pointer',
                type === 'password' && 'pr-10',
                props.disabled
                  ? 'bg-gray-50 dark:bg-light-dark cursor-not-allowed dark:cursor-not-allowed'
                  : '',
                inputClassName,
                (suffix || icon) && 'pl-10'
              )}
            />
            {/* Left side: icon */}
            {(suffix || icon) && (
              <span
                className={cn(
                  'w-10 h-10 flex items-center justify-center absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap leading-normal text-gray-400 dark:text-white',
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
                className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded-sm"
                aria-label={
                  showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Right side: date picker toggle */}
            {type === 'date' && (
              <button
                type="button"
                onClick={toggleCalendar}
                className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded-sm"
                aria-label="Abrir selector de fecha"
              >
                <Calendar className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Custom Date Picker */}
          {type === 'date' && isCalendarOpen && (
            <div
              ref={calendarRef}
              className="absolute top-full left-0 z-50 mt-1 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>

                <button
                  type="button"
                  onClick={toggleYearPicker}
                  className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded-md transition-colors"
                >
                  {currentMonth.toLocaleDateString('es-ES', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </button>

                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Year Picker */}
              {showYearPicker && (
                <div className="mb-4">
                  <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                    {generateYears().map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearSelect(year)}
                        className={cn(
                          'text-xs p-2 rounded-md transition-colors',
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
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map((day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
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
                          className={cn(
                            'text-xs p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700',
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
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => handleDateSelect(new Date())}
                      className="w-full text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium py-1 transition-colors"
                    >
                      Hoy
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {error && <FieldError id={errorId} error={error} size="DEFAULT" />}
        {!error && helperText && (
          <FieldHelperText id={helperId} size="DEFAULT">
            {helperText}
          </FieldHelperText>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
