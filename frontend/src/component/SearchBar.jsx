import React from 'react';
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
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    if (onSearch) {
      const timer = setTimeout(() => onSearch(internalValue), debounceMs);
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
    lg: 'left-3.5'
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        className={`absolute pointer-events-none ${iconSizes[size] || iconSizes.md}`}
        style={{ color: 'var(--color-text-muted)', width: size === 'lg' ? 18 : undefined, height: size === 'lg' ? 18 : undefined }}
      />

      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-lg focus:outline-none transition-all duration-150 ${sizeStyles[size] || sizeStyles.md}`}
        style={{
          background: 'var(--color-background)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
          caretColor: 'var(--color-amber)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-amber)';
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(245,166,35,0.15)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      <div className="absolute right-2.5 flex items-center gap-1.5">
        {internalValue ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-md transition-colors cursor-pointer"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          shortcut && (
            <kbd
              className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded select-none"
              style={{
                color: 'var(--color-text-muted)',
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)'
              }}
            >
              {shortcut}
            </kbd>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
