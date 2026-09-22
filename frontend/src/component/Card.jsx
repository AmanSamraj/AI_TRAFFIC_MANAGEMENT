import React from 'react';

/* ─── Card Shell ─────────────────────────────────────────── */
export const Card = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  ...props
}) => {
  const getStyle = () => {
    const base = {
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: '10px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.15s, border-color 0.15s',
    };

    if (variant === 'glow' || variant === 'glass') {
      return { ...base, borderColor: 'var(--color-border-dark)' };
    }
    if (variant === 'alert') {
      return { ...base, background: 'rgba(220,53,69,0.04)', borderColor: 'rgba(220,53,69,0.2)' };
    }
    if (variant === 'warning') {
      return { ...base, background: 'rgba(245,166,35,0.04)', borderColor: 'rgba(245,166,35,0.25)' };
    }
    if (variant === 'metric') {
      return { ...base };
    }
    return base;
  };

  const hoverStyle = onClick
    ? { cursor: 'pointer' }
    : {};

  return (
    <div
      onClick={onClick}
      className={`overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ ...getStyle(), ...hoverStyle }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        if (onClick) e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/* ─── Sub-components ─────────────────────────────────────── */
export const CardHeader = ({ children, className = '', ...props }) => (
  <div
    className={`px-5 py-3.5 flex items-center justify-between gap-4 ${className}`}
    style={{ borderBottom: '1px solid var(--color-border)' }}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3
    className={`text-sm font-semibold flex items-center gap-2 ${className}`}
    style={{ color: 'var(--color-text)' }}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p
    className={`text-xs mt-0.5 leading-relaxed ${className}`}
    style={{ color: 'var(--color-text-secondary)' }}
    {...props}
  >
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} style={{ color: 'var(--color-text)' }} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div
    className={`px-5 py-3 flex items-center justify-between gap-4 ${className}`}
    style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-background)' }}
    {...props}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
