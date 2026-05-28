/** Generic default layout icon: 4 rounded squares grid */
export function DefaultThemeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

/** macOS Sonoma style window icon: rounded rect with three traffic-light dots */
export function MacOSThemeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <circle cx="6" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** macOS Tahoe style window icon: rounded window + floating pill dock bar */
export function MacOSTahoeThemeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="15" rx="4" />
      <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="6" r="1" fill="currentColor" stroke="none" />
      <rect
        x="5"
        y="20"
        width="14"
        height="2.5"
        rx="1.25"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
