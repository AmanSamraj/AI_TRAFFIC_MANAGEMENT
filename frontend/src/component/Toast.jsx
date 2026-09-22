import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const Toast = ({
  id,
  type = 'info',
  title,
  message,
  onClose
}) => {
  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />,
      borderColor: 'rgba(25,135,84,0.3)',
      bgTint: 'rgba(25,135,84,0.04)',
    },
    warning: {
      icon: <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-amber)' }} />,
      borderColor: 'rgba(245,166,35,0.3)',
      bgTint: 'rgba(245,166,35,0.04)',
    },
    danger: {
      icon: <AlertOctagon className="w-4 h-4" style={{ color: 'var(--color-danger)' }} />,
      borderColor: 'rgba(220,53,69,0.3)',
      bgTint: 'rgba(220,53,69,0.04)',
    },
    info: {
      icon: <Info className="w-4 h-4" style={{ color: 'var(--color-info)' }} />,
      borderColor: 'rgba(91,103,112,0.3)',
      bgTint: 'rgba(91,103,112,0.04)',
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div
      className="relative w-80 max-w-sm rounded-lg p-3.5 flex items-start gap-3 transition-all duration-200"
      style={{
        background: 'var(--color-card)',
        border: `1px solid ${config.borderColor}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      }}
      role="alert"
    >
      <div className="shrink-0 mt-0.5 p-1 rounded" style={{ background: config.bgTint }}>
        {config.icon}
      </div>

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-xs font-semibold tracking-wide truncate" style={{ color: 'var(--color-text)' }}>
            {title}
          </h4>
        )}
        {message && (
          <p className="text-xs mt-0.5 leading-relaxed break-words" style={{ color: 'var(--color-text-secondary)' }}>
            {message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onClose(id)}
        className="shrink-0 p-1 rounded-md transition-colors cursor-pointer"
        style={{ color: 'var(--color-text-muted)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
        aria-label="Dismiss alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    if (duration > 0) {
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export default Toast;
