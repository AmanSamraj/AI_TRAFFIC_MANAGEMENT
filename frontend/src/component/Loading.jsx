import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const Loading = ({
  fullScreen = false,
  label = 'Processing Telemetry...',
  className = ''
}) => {
  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: 'rgba(28,28,26,0.6)' }}
        role="status"
        aria-label={label}
      >
        <div
          className="p-8 rounded-xl flex flex-col items-center max-w-sm w-full mx-4"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}
        >
          <LoadingSpinner size="xl" variant="primary" />
          <p className="mt-4 text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--color-amber-dark)' }}>
            {label}
          </p>
          <span className="mt-1 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
            Traffic AI Control System
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center p-12 w-full ${className}`}>
      <LoadingSpinner size="lg" variant="primary" />
      {label && (
        <p className="mt-3 text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </p>
      )}
    </div>
  );
};

export default Loading;
