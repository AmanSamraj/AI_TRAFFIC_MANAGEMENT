import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronDown } from 'lucide-react';

export const DatePicker = ({
  value,
  onChange,
  presets = [
    { label: 'Live (5 min)', value: '5m' },
    { label: 'Past 1 Hour', value: '1h' },
    { label: 'Today', value: 'today' },
    { label: 'Last 24 Hours', value: '24h' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'This Month', value: '30d' }
  ],
  placeholder = 'Select timeframe',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(value || presets[2].value);
  const [customDate, setCustomDate] = useState('');
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPreset = (presetValue) => {
    setSelectedPreset(presetValue);
    onChange?.(presetValue);
    setIsOpen(false);
  };

  const handleCustomDateChange = (e) => {
    const val = e.target.value;
    setCustomDate(val);
    if (val) {
      setSelectedPreset('custom');
      onChange?.(val);
    }
  };

  const currentLabel =
    presets.find((p) => p.value === selectedPreset)?.label ||
    (selectedPreset === 'custom' && customDate ? customDate : placeholder);

  return (
    <div className={`relative inline-block ${className}`} ref={pickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-xl hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-colors cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentLabel}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-64 p-3 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl shadow-black/50 text-xs text-slate-200 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="mb-2.5 pb-2 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
              Quick Telemetry Presets
            </span>
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {presets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handleSelectPreset(preset.value)}
                className={`py-1.5 px-2 text-left rounded-lg transition-colors cursor-pointer text-xs font-medium ${
                  selectedPreset === preset.value
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Custom Date
            </label>
            <input
              type="date"
              value={customDate}
              onChange={handleCustomDateChange}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
