import { useId } from 'react';

export const DefiAppLogo = (props: React.SVGAttributes<SVGElement>) => {
  const uniqueId = useId().replace(/:/g, ''); // Remove colons for safer SVG ID usage
  const gradientId = `brain-gradient-${uniqueId}`;
  const filterId = `glow-brain-${uniqueId}`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>
        {`
          @keyframes pulse-node {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes signal-flow {
            0% { stroke-dashoffset: 100; opacity: 0.5; }
            50% { opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0.5; }
          }
          .brain-node {
            transform-box: fill-box;
            transform-origin: center;
            animation: pulse-node 3s infinite ease-in-out;
          }
          .brain-signal {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: signal-flow 2s infinite linear;
          }
        `}
      </style>

      {/* Brain Structure - Nodes */}
      <g filter={`url(#${filterId})`}>
        {/* Left Hemisphere */}
        <circle
          cx="30"
          cy="40"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0s' }}
        />
        <circle
          cx="25"
          cy="55"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.2s' }}
        />
        <circle
          cx="35"
          cy="70"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.4s' }}
        />
        <circle
          cx="45"
          cy="30"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.6s' }}
        />
        <circle
          cx="45"
          cy="50"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.8s' }}
        />
        <circle
          cx="45"
          cy="75"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '1s' }}
        />

        {/* Right Hemisphere */}
        <circle
          cx="70"
          cy="40"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.1s' }}
        />
        <circle
          cx="75"
          cy="55"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.3s' }}
        />
        <circle
          cx="65"
          cy="70"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.5s' }}
        />
        <circle
          cx="55"
          cy="30"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.7s' }}
        />
        <circle
          cx="55"
          cy="50"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '0.9s' }}
        />
        <circle
          cx="55"
          cy="75"
          r="2.5"
          fill={`url(#${gradientId})`}
          className="brain-node"
          style={{ animationDelay: '1.1s' }}
        />

        {/* Connections (Static low opacity) */}
        <path
          d="M30 40 L45 30 L55 30 L70 40 M25 55 L45 50 L55 50 L75 55 M35 70 L45 75 L55 75 L65 70 M30 40 L25 55 L35 70 M70 40 L75 55 L65 70 M45 30 L45 50 L45 75 M55 30 L55 50 L55 75"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Active Signals (Animated) - Representing financial data flow */}
        <path
          d="M25 55 L45 50 L55 30 L70 40"
          stroke="#EC4899"
          strokeWidth="2"
          fill="none"
          className="brain-signal"
          style={{ animationDelay: '0s' }}
        />
        <path
          d="M30 40 L45 50 L55 75 L65 70"
          stroke="#3B82F6"
          strokeWidth="2"
          fill="none"
          className="brain-signal"
          style={{ animationDelay: '1s' }}
        />

        {/* Financial Graph Overlay (Subtle) */}
      </g>
    </svg>
  );
};
