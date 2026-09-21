import React from 'react';

export const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  label,
  className = ''
}) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-9 h-9 border-3',
    xl: 'w-12 h-12 border-4'
  };

  const variantMap = {
    primary: 'border-cyan-500/20 border-t-cyan-400',
    blue: 'border-blue-500/20 border-t-blue-400',
    white: 'border-white/20 border-t-white',
    danger: 'border-red-500/20 border-t-red-500',
    warning: 'border-amber-500/20 border-t-amber-400',
    emerald: 'border-emerald-500/20 border-t-emerald-400'
  };

  return (
    <div className={`inline-flex items-center justify-center gap-2.5 ${className}`}>
      <div
        className={`rounded-full animate-spin ${sizeMap[size] || sizeMap.md} ${variantMap[variant] || variantMap.primary}`}
        role="status"
        aria-label={label || "Loading"}
      />
      {label && (
        <span className="text-xs font-medium text-slate-300 tracking-wide select-none">
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
