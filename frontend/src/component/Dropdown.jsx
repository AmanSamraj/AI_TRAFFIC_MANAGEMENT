import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select option...',
  trigger,
  align = 'left',
  className = '',
  menuClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option) => {
    if (option.disabled) return;
    onChange?.(option.value, option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-between gap-2.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer min-w-[150px]"
          style={{
            background: 'var(--color-card)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border-dark)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2 truncate">
            {selectedOption?.icon && <span style={{ color: 'var(--color-text-muted)' }}>{selectedOption.icon}</span>}
            <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform duration-200 shrink-0"
            style={{
              color: isOpen ? 'var(--color-amber)' : 'var(--color-text-muted)',
              transform: isOpen ? 'rotate(180deg)' : 'none'
            }}
          />
        </button>
      )}

      {/* Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 min-w-[180px] max-h-64 overflow-y-auto py-1 text-xs ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${menuClassName}`}
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border-dark)',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          {options.map((option, idx) => {
            if (option.divider) {
              return <div key={idx} className="my-1" style={{ borderTop: '1px solid var(--color-border)' }} />;
            }

            const isSelected = option.value === value;

            return (
              <button
                key={option.value || idx}
                type="button"
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-3 py-2 flex items-center justify-between gap-2 transition-colors cursor-pointer"
                style={{
                  color: option.disabled
                    ? 'var(--color-text-muted)'
                    : isSelected
                      ? 'var(--color-amber-dark)'
                      : 'var(--color-text)',
                  background: isSelected ? 'rgba(245,166,35,0.06)' : 'transparent',
                  fontWeight: isSelected ? 600 : 400,
                  opacity: option.disabled ? 0.5 : 1,
                  cursor: option.disabled ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!option.disabled && !isSelected) e.currentTarget.style.background = 'var(--color-background)';
                }}
                onMouseLeave={(e) => {
                  if (!option.disabled) e.currentTarget.style.background = isSelected ? 'rgba(245,166,35,0.06)' : 'transparent';
                }}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {option.icon && (
                    <span style={{ color: isSelected ? 'var(--color-amber)' : 'var(--color-text-muted)' }}>
                      {option.icon}
                    </span>
                  )}
                  <span className="truncate">{option.label}</span>
                </div>

                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-amber)' }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
