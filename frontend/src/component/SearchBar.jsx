import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search license plates, cameras, road nodes...',
  debounceMs = 300,
  shortcut = '⌘K',
  className = '',
  size = 'md'
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (onSearch) {
      const timer = setTimeout(() => {
        onSearch(internalValue);
      }, debounceMs);
      return () => clearTimeout(timer);
    }
  }, [internalValue, debounceMs, onSearch]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    onChange?.(val, e);
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    onSearch?.('');
  };

  const sizeStyles = {
    sm: 'py-1.5 pl-8 pr-8 text-xs',
    md: 'py-2 pl-9 pr-9 text-xs',
    lg: 'py-2.5 pl-10 pr-10 text-sm'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3',
    lg: 'w-4.5 h-4.5 left-3.5'
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        className={`absolute text-slate-400 pointer-events-none transition-colors ${iconSizes[size] || iconSizes.md}`}
      />

      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full bg-slate-900/90 text-slate-100 placeholder-slate-500 border border-slate-700/80 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all duration-150 ${sizeStyles[size] || sizeStyles.md}`}
      />

      <div className="absolute right-2.5 flex items-center gap-1.5">
        {internalValue ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-850 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          shortcut && (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/90 border border-slate-700/80 rounded select-none">
              {shortcut}
            </kbd>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
