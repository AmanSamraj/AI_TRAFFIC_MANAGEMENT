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
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/40',
      shadow: 'shadow-emerald-950/30'
    },
    warning: {
      icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/40',
      shadow: 'shadow-amber-950/30'
    },
    danger: {
      icon: <AlertOctagon className="w-4 h-4 text-red-400" />,
      border: 'border-red-500/40',
      bg: 'bg-red-950/40',
      shadow: 'shadow-red-950/30'
    },
    info: {
      icon: <Info className="w-4 h-4 text-cyan-400" />,
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-950/40',
      shadow: 'shadow-cyan-950/30'
    }
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <div
      className={`relative w-80 max-w-sm rounded-xl border p-3.5 shadow-xl backdrop-blur-md bg-slate-900/95 flex items-start gap-3 transition-all duration-200 animate-in slide-in-from-top-2 fade-in ${config.border} ${config.shadow}`}
      role="alert"
    >
      <div className="shrink-0 mt-0.5">{config.icon}</div>

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-xs font-semibold text-slate-100 tracking-wide truncate">
            {title}
          </h4>
        )}
        {message && (
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed break-words">
            {message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onClose(id)}
        className="shrink-0 p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
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
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
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
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default Toast;
