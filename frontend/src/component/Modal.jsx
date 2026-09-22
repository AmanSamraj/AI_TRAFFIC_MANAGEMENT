import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-lg',
  showClose = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 transition-opacity"
        style={{ background: 'rgba(28,28,26,0.5)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidth} overflow-hidden z-10`}
        style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border-dark)',
          borderRadius: '10px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showClose) && (
          <div
            className="flex items-center justify-between p-5"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <div>
              {title && (
                <h3 id="modal-title" className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {subtitle}
                </p>
              )}
            </div>

            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-md transition-colors cursor-pointer"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-background)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto text-sm" style={{ color: 'var(--color-text)' }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="flex items-center justify-end gap-3 px-6 py-4"
            style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-background)' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
