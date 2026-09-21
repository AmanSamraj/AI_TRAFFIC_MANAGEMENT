import React from 'react';

export const Card = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-slate-900/80 border-slate-800/90 shadow-lg shadow-black/20',
    glass: 'bg-slate-900/60 backdrop-blur-xl border-slate-700/40 shadow-xl shadow-black/30',
    glow: 'bg-slate-900/90 border-cyan-500/30 shadow-lg shadow-cyan-500/10 hover:border-cyan-400/50 hover:shadow-cyan-500/20',
    alert: 'bg-red-950/20 border-red-500/30 shadow-lg shadow-red-500/10 hover:border-red-400/50',
    warning: 'bg-amber-950/20 border-amber-500/30 shadow-lg shadow-amber-500/10',
    metric: 'bg-gradient-to-b from-slate-850/90 to-slate-900/90 border-slate-800 hover:border-slate-700'
  };

  const interactiveStyles = onClick ? 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0' : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${variantStyles[variant] || variantStyles.default} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-5 pb-3 flex items-center justify-between gap-4 border-b border-slate-800/60 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-semibold tracking-wide text-slate-100 flex items-center gap-2 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-xs text-slate-400 mt-0.5 font-normal leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-4 px-5 bg-slate-950/40 border-t border-slate-800/60 flex items-center justify-between gap-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
