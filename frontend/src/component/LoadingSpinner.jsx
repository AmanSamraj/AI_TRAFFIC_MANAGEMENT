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
    lg: 'w-9 h-9 border-[3px]',
    xl: 'w-12 h-12 border-4'
  };

  const getSpinnerStyle = () => {
    switch (variant) {
      case 'primary':
        return { borderColor: 'rgba(245,166,35,0.15)', borderTopColor: 'var(--color-amber)' };
      case 'danger':
        return { borderColor: 'rgba(220,53,69,0.15)', borderTopColor: 'var(--color-danger)' };
      case 'warning':
        return { borderColor: 'rgba(245,166,35,0.15)', borderTopColor: 'var(--color-amber)' };
      case 'emerald':
      case 'success':
        return { borderColor: 'rgba(25,135,84,0.15)', borderTopColor: 'var(--color-success)' };
      case 'white':
        return { borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff' };
      default:
        return { borderColor: 'rgba(245,166,35,0.15)', borderTopColor: 'var(--color-amber)' };
    }
  };

  return (
    <div className={`inline-flex items-center justify-center gap-2.5 ${className}`}>
      <div
        className={`rounded-full animate-spin ${sizeMap[size] || sizeMap.md}`}
        style={getSpinnerStyle()}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && (
        <span className="text-xs font-medium tracking-wide select-none" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
