import React from 'react';

export const StatusIndicator = ({
  status = 'online',
  label,
  sublabel,
  size = 'md',
  pulse = true,
  className = ''
}) => {
  const statusConfig = {
    online: {
      color: 'var(--color-success)',
      defaultLabel: 'Online'
    },
    warning: {
      color: 'var(--color-amber)',
      defaultLabel: 'Warning'
    },
    alert: {
      color: 'var(--color-danger)',
      defaultLabel: 'Alert / Congested'
    },
    offline: {
      color: 'var(--color-text-muted)',
      defaultLabel: 'Offline'
    },
    tracking: {
      color: 'var(--color-amber-dark)',
      defaultLabel: 'AI Tracking Active'
    }
  };

  const config = statusConfig[status] || statusConfig.online;

  const dotSizes = { sm: 6, md: 8, lg: 10 };
  const ringSizes = { sm: 16, md: 20, lg: 28 };

  const dotSize = dotSizes[size] || dotSizes.md;
  const ringSize = ringSizes[size] || ringSizes.md;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
        {pulse && status !== 'offline' && (
          <span
            className="absolute rounded-full animate-ping opacity-40"
            style={{ background: config.color, width: ringSize, height: ringSize }}
          />
        )}
        <span
          className="relative inline-flex rounded-full"
          style={{ background: config.color, width: dotSize, height: dotSize }}
        />
      </div>

      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--color-text)' }}>
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[10px] font-medium tracking-wider" style={{ color: config.color }}>
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
