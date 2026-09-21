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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
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
          className="inline-flex items-center justify-between gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:border-slate-600 hover:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer min-w-[150px]"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2 truncate">
            {selectedOption?.icon && <span className="text-slate-400">{selectedOption.icon}</span>}
            <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-cyan-400' : ''
            }`}
          />
        </button>
      )}

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 min-w-[180px] max-h-64 overflow-y-auto rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700/90 shadow-2xl shadow-black/40 py-1.5 text-xs text-slate-200 animate-in fade-in-50 zoom-in-95 duration-150 ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${menuClassName}`}
        >
          {options.map((option, idx) => {
            if (option.divider) {
              return <div key={idx} className="my-1 border-t border-slate-800" />;
            }

            const isSelected = option.value === value;

            return (
              <button
                key={option.value || idx}
                type="button"
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                  option.disabled
                    ? 'opacity-40 cursor-not-allowed text-slate-500'
                    : isSelected
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                    : 'hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {option.icon && (
                    <span className={`shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {option.icon}
                    </span>
                  )}
                  <span className="truncate">{option.label}</span>
                </div>

                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
