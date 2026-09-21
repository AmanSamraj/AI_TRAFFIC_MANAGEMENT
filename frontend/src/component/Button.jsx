import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    xs: 'text-xs px-2.5 py-1 gap-1.5',
    sm: 'text-xs px-3 py-1.5 gap-1.5 font-semibold',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5 font-semibold'
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 focus:ring-cyan-400 border border-cyan-400/30',
    secondary: 'bg-slate-800/90 hover:bg-slate-750 text-slate-100 border border-slate-700/80 hover:border-slate-600 shadow-sm focus:ring-slate-400',
    danger: 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 focus:ring-red-500 border border-red-500/30 font-semibold',
    warning: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 focus:ring-amber-400 border border-amber-400/40',
    outline: 'bg-transparent hover:bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 focus:ring-cyan-500',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent focus:ring-slate-400'
  };

  const spinnerColorMap = {
    primary: 'white',
    secondary: 'white',
    danger: 'white',
    warning: 'white',
    outline: 'primary',
    ghost: 'primary'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner
            size={size === 'lg' ? 'md' : 'sm'}
            variant={spinnerColorMap[variant] || 'white'}
          />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;