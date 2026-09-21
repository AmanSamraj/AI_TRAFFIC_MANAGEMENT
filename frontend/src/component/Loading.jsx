import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export const Loading = ({
  fullScreen = false,
  message = 'Loading traffic telemetry...',
  size = 'lg',
  className = ''
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
        <LoadingSpinner size={size} variant="primary" />
        {message && (
          <p className="mt-4 text-sm font-medium tracking-wider text-cyan-400/90 uppercase animate-pulse">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-10 px-4 w-full ${className}`}>
      <LoadingSpinner size={size} variant="primary" />
      {message && (
        <p className="mt-3 text-xs font-medium tracking-wide text-slate-400 uppercase">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
