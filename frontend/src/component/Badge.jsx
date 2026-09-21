import React from 'react';

export const Badge = ({
  children,
  variant = 'info',
  size = 'md',
  dot = false,
  pulse = false,
  pill = true,
  className = '',
  ...props
}) => {
  const variantStyles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    danger: 'bg-red-500/10 text-red-400 border-red-500/25',
    info: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25'
  };

  const dotColors = {
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    info: 'bg-cyan-400',
    neutral: 'bg-slate-400',
    purple: 'bg-purple-400'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold tracking-wide'
  };

  return (
    <span
      className={`inline-flex items-center border select-none transition-colors ${
        pill ? 'rounded-full' : 'rounded-md'
      } ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.info} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                dotColors[variant] || 'bg-cyan-400'
              }`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
              dotColors[variant] || 'bg-cyan-400'
            }`}
          />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
