import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Clock, Check } from 'lucide-react';

const PRESETS = [
  { label: 'Live (Last 5m)', value: 'live-5m' },
  { label: 'Past 1 Hour', value: '1h' },
  { label: 'Today', value: 'today' },
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Custom Range', value: 'custom' },
];

export const DatePicker = ({
  value = 'today',
  onChange,
  className = '',
  align = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(value);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (presetVal) => {
    setSelectedPreset(presetVal);
    if (presetVal !== 'custom') {
      onChange?.(presetVal);
      setIsOpen(false);
    }
  };

  const handleCustomApply = () => {
    if (startDate && endDate) {
      onChange?.({ start: startDate, end: endDate, type: 'custom' });
      setIsOpen(false);
    }
  };

  const activeLabel = PRESETS.find((p) => p.value === selectedPreset)?.label || 'Select Date';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer"
        style={{
          background: 'var(--color-card)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border-dark)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
      >
        <span className="flex items-center gap-2">
          <CalendarIcon className="w-3.5 h-3.5" style={{ color: 'var(--color-amber)' }} />
          <span>{activeLabel}</span>
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform duration-200"
          style={{
            color: isOpen ? 'var(--color-amber)' : 'var(--color-text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'none'
          }}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 w-64 rounded-lg p-2.5 text-xs ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border-dark)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          }}
        >
          <div className="flex items-center gap-1.5 px-2 py-1 mb-1 font-semibold uppercase tracking-wider text-[10px]" style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>
            <Clock className="w-3 h-3" style={{ color: 'var(--color-amber)' }} />
            <span>Time Range Presets</span>
          </div>

          <div className="space-y-0.5">
            {PRESETS.map((preset) => {
              const isSelected = selectedPreset === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleSelect(preset.value)}
                  className="w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition-colors cursor-pointer"
                  style={{
                    color: isSelected ? 'var(--color-amber-dark)' : 'var(--color-text)',
                    background: isSelected ? 'rgba(245,166,35,0.08)' : 'transparent',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--color-background)'; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span>{preset.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-amber)' }} />}
                </button>
              );
            })}
          </div>

          {selectedPreset === 'custom' && (
            <div className="mt-2 pt-2 space-y-2" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>From Date</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md px-2 py-1 text-xs focus:outline-none"
                  style={{
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>To Date</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-md px-2 py-1 text-xs focus:outline-none"
                  style={{
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <button
                type="button"
                onClick={handleCustomApply}
                className="w-full py-1.5 font-semibold text-xs rounded-md transition-colors cursor-pointer"
                style={{
                  background: 'var(--color-amber)',
                  color: 'var(--color-charcoal)',
                }}
              >
                Apply Range
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
