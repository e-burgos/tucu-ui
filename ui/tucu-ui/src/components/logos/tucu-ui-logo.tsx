import React from 'react';

interface TucuLogoProps {
  size?: number | string;
  className?: string;
  props?: React.SVGAttributes<SVGElement>;
}

export const TucuUiLogo: React.FC<TucuLogoProps> = ({
  size = 60,
  className = '',
  props,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Clean background */}
      <rect width="240" height="240" rx="54" />

      <g transform="translate(40, 50)">
        {/* The double T (Your base proposal) */}
        {/* T Back - Represents the Core / Engine */}
        <path
          d="M5 28 L90 28 L80 50 L53 50 L35 120 L8 120 L26 50 L5 50 Z"
          className="fill-slate-400 dark:fill-slate-600 transition-colors"
        />

        {/* T Front - Represents the Visual Layer / Tailwind */}
        <path
          d="M45 0 L130 0 L120 22 L93 22 L75 92 L48 92 L66 22 L45 22 Z"
          className="fill-primary"
        />

        {/* Letters "ui" - Sophisticated and Minimalist */}
        <g transform="translate(90, 95) skewX(-15)">
          {/* 'u' minimalist: a single continuous line of thin stroke */}
          <path
            d="M5 0 V14 C5 17.3 7.7 20 11 20 C14.3 20 17 17.3 17 14 V0"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="stroke-slate-900 dark:stroke-slate-200"
          />

          {/* 'i' minimalist: a subtle pillar */}
          <g transform="translate(30, 0)">
            <path
              d="M0 5 V20"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="stroke-slate-900 dark:stroke-slate-200"
            />
            {/* The dot of the 'i' as a precision detail */}
            <rect
              x="-2"
              y="-5"
              width="4"
              height="4"
              rx="1"
              className="fill-fuchsia-500"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default TucuUiLogo;
