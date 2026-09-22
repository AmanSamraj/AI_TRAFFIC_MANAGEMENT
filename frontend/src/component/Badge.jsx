import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  pill = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[9px]',
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-[11px]',
    lg: 'px-3 py-1 text-xs'
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'success':
        return { background: 'rgba(25,135,84,0.1)', color: 'var(--color-success)', border: '1px solid rgba(25,135,84,0.2)' };
      case 'warning':
        return { background: 'rgba(245,166,35,0.1)', color: 'var(--color-amber-dark)', border: '1px solid rgba(245,166,35,0.2)' };
      case 'danger':
        return { background: 'rgba(220,53,69,0.1)', color: 'var(--color-danger)', border: '1px solid rgba(220,53,69,0.2)' };
      case 'info':
      case 'purple':
        return { background: 'rgba(91,103,112,0.1)', color: 'var(--color-info)', border: '1px solid rgba(91,103,112,0.2)' };
      case 'amber':
        return { background: 'rgba(245,166,35,0.12)', color: 'var(--color-amber-dark)', border: '1px solid rgba(245,166,35,0.25)' };
      case 'neutral':
      default:
        return { background: 'var(--color-background)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' };
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'success': return 'var(--color-success)';
      case 'warning': return 'var(--color-amber)';
      case 'danger':  return 'var(--color-danger)';
      case 'info':
      case 'purple':  return 'var(--color-info)';
      case 'amber':   return 'var(--color-amber)';
      default:        return 'var(--color-text-muted)';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold tracking-wide select-none whitespace-nowrap
        ${sizeStyles[size] || sizeStyles.md}
        ${pill ? 'rounded-full' : 'rounded'}
        ${className}`}
      style={getVariantStyle()}
      {...props}
    >
      {dot && (
        <span className="relative flex items-center justify-center w-2.5 h-2.5">
          {pulse && (
            <span
              className="absolute w-full h-full rounded-full animate-ping opacity-50"
              style={{ background: getDotColor() }}
            />
          )}
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: getDotColor() }}
          />
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
