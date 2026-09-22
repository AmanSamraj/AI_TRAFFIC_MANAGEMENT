import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    xs: 'px-2.5 py-1 text-[11px] gap-1.5 rounded',
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-md',
    md: 'px-4 py-2 text-xs gap-2 rounded-lg',
    lg: 'px-5 py-2.5 text-sm gap-2.5 rounded-lg'
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--color-amber)',
          color: 'var(--color-charcoal)',
          border: '1px solid var(--color-amber)',
          fontWeight: 600,
        };
      case 'secondary':
        return {
          background: 'transparent',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border-dark)',
          fontWeight: 500,
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
          fontWeight: 500,
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          border: '1px solid transparent',
          fontWeight: 500,
        };
      case 'danger':
        return {
          background: 'var(--color-danger)',
          color: '#fff',
          border: '1px solid var(--color-danger)',
          fontWeight: 600,
        };
      case 'success':
        return {
          background: 'var(--color-success)',
          color: '#fff',
          border: '1px solid var(--color-success)',
          fontWeight: 600,
        };
      default:
        return {
          background: 'var(--color-amber)',
          color: 'var(--color-charcoal)',
          border: '1px solid var(--color-amber)',
          fontWeight: 600,
        };
    }
  };

  const handleHover = (e, entering) => {
    if (disabled || isLoading) return;
    switch (variant) {
      case 'primary':
        e.currentTarget.style.background = entering ? 'var(--color-amber-dark)' : 'var(--color-amber)';
        e.currentTarget.style.borderColor = entering ? 'var(--color-amber-dark)' : 'var(--color-amber)';
        break;
      case 'secondary':
        e.currentTarget.style.background = entering ? 'var(--color-background)' : 'transparent';
        break;
      case 'outline':
        e.currentTarget.style.background = entering ? 'var(--color-background)' : 'transparent';
        e.currentTarget.style.borderColor = entering ? 'var(--color-border-dark)' : 'var(--color-border)';
        break;
      case 'ghost':
        e.currentTarget.style.background = entering ? 'var(--color-background)' : 'transparent';
        break;
      case 'danger':
        e.currentTarget.style.opacity = entering ? '0.9' : '1';
        break;
      case 'success':
        e.currentTarget.style.opacity = entering ? '0.9' : '1';
        break;
      default:
        break;
    }
  };

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium tracking-wide transition-all duration-150 cursor-pointer select-none
        ${sizeStyles[size] || sizeStyles.md}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}`}
      style={getVariantStyle()}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
      {...props}
    >
      {isLoading && (
        <div
          className="w-3.5 h-3.5 border-2 rounded-full animate-spin"
          style={{
            borderColor: variant === 'primary' ? 'rgba(28,28,26,0.2)' : 'rgba(145,139,128,0.3)',
            borderTopColor: variant === 'primary' ? 'var(--color-charcoal)' : 'var(--color-text-secondary)'
          }}
        />
      )}
      {!isLoading && icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
};

export default Button;