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
      color: 'bg-emerald-500',
      pingColor: 'bg-emerald-400',
      textColor: 'text-emerald-400',
      defaultLabel: 'Online'
    },
    warning: {
      color: 'bg-amber-500',
      pingColor: 'bg-amber-400',
      textColor: 'text-amber-400',
      defaultLabel: 'Warning'
    },
    alert: {
      color: 'bg-red-500',
      pingColor: 'bg-red-500',
      textColor: 'text-red-400',
      defaultLabel: 'Alert / Congested'
    },
    offline: {
      color: 'bg-slate-500',
      pingColor: 'bg-slate-400',
      textColor: 'text-slate-400',
      defaultLabel: 'Offline'
    },
    tracking: {
      color: 'bg-cyan-500',
      pingColor: 'bg-cyan-400',
      textColor: 'text-cyan-400',
      defaultLabel: 'AI Tracking Active'
    }
  };

  const config = statusConfig[status] || statusConfig.online;

  const dotSizes = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3.5 w-3.5'
  };

  const ringSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-7 w-7'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`relative flex items-center justify-center ${ringSizes[size] || ringSizes.md}`}>
        {pulse && status !== 'offline' && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${config.pingColor}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full ${dotSizes[size] || dotSizes.md} ${config.color} shadow-sm`}
        />
      </div>

      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              {label}
            </span>
          )}
          {sublabel && (
            <span className={`text-[10px] font-medium tracking-wider ${config.textColor}`}>
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
