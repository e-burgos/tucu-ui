const BrandingImage = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <TucuUIBanner />
    </div>
  );
};

export default BrandingImage;

interface TucuUIBannerProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const TucuUIBanner: React.FC<TucuUIBannerProps> = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <title>Tucu UI - Modern React Component Library</title>
      <defs>
        {/* Gradient background */}
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Accent gradient Tailwind v4 style */}
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        {/* Brightness filter for highlighted elements */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base background */}
      <rect width="400" height="500" rx="20" fill="url(#bgGrad)" />

      {/* Grid background (Layout Systems) */}
      <g stroke="white" strokeOpacity="0.03" strokeWidth="1">
        {[...Array(10)].map((_, i) => (
          <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="500" />
        ))}
        {[...Array(12)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
        ))}
      </g>

      {/* Representation of Layer Architecture (Theming) */}
      <g transform="translate(40, 180)">
        {/* Background layer */}
        <rect
          x="40"
          y="60"
          width="280"
          height="180"
          rx="12"
          fill="#334155"
          fillOpacity="0.3"
          transform="rotate(-3)"
        />
        {/* Intermediate layer */}
        <rect
          x="30"
          y="40"
          width="280"
          height="180"
          rx="12"
          fill="#475569"
          fillOpacity="0.4"
          stroke="#64748b"
          strokeWidth="1"
          transform="rotate(-1.5)"
        />
        {/* Top layer (Main UI) */}
        <rect
          x="20"
          y="20"
          width="280"
          height="180"
          rx="12"
          fill="#1e293b"
          stroke="url(#accentGrad)"
          strokeWidth="2"
        />

        {/* Simulated UI elements */}
        <rect
          x="40"
          y="45"
          width="80"
          height="24"
          rx="6"
          fill="url(#accentGrad)"
        />
        <rect x="130" y="45" width="40" height="24" rx="6" fill="#334155" />

        <rect x="40" y="85" width="240" height="10" rx="5" fill="#334155" />
        <rect x="40" y="105" width="180" height="10" rx="5" fill="#334155" />

        <circle
          cx="260"
          cy="155"
          r="15"
          fill="#818cf8"
          fillOpacity="0.2"
          stroke="#818cf8"
          strokeWidth="1"
        />
        <path
          d="M 255 155 L 265 155 M 260 150 L 260 160"
          stroke="#818cf8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Header text */}
      <text
        x="200"
        y="80"
        textAnchor="middle"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 800,
          fontSize: '48px',
        }}
        fill="white"
      >
        Tucu <tspan fill="url(#accentGrad)">UI</tspan>
      </text>

      <text
        x="200"
        y="115"
        textAnchor="middle"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          letterSpacing: '0.2em',
        }}
        fill="#94a3b8"
      >
        TAILWIND CSS v4 • REACT
      </text>

      {/* Color preset indicators */}
      <g transform="translate(85, 420)">
        <text
          x="115"
          y="-15"
          textAnchor="middle"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
          }}
          fill="#64748b"
        >
          34+ ADAPTIVE COLOR PRESETS
        </text>
        {[
          '#ef4444',
          '#f59e0b',
          '#10b981',
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#94a3b8',
        ].map((color, i) => (
          <circle
            key={color}
            cx={i * 38}
            cy="10"
            r="12"
            fill={color}
            stroke="#0f172a"
            strokeWidth="2"
          />
        ))}
      </g>

      {/* Footer information */}
      <text
        x="200"
        y="480"
        textAnchor="middle"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px' }}
        fill="#475569"
      >
        PRODUCTION-READY • FULLY ACCESSIBLE • TYPESCRIPT
      </text>

      {/* Borde decorativo fino */}
      <rect
        x="2"
        y="2"
        width="396"
        height="496"
        rx="19"
        fill="none"
        stroke="white"
        strokeOpacity="0.1"
        strokeWidth="1"
      />
    </svg>
  );
};
