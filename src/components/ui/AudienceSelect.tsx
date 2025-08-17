import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface AudienceSelectProps {
  value?: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  options: string[];
  placeholder?: string;
  error?: string;
  className?: string;
}

export function AudienceSelect({
  value = '',
  onChange,
  onKeyPress,
  options,
  placeholder = "Select or enter audience...",
  error,
  className
}: AudienceSelectProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');

  useEffect(() => {
    // Check if current value is in options or if it's a custom value
    if (value && !options.includes(value)) {
      setIsCustom(true);
      setCustomValue(value);
    } else if (value === 'Custom') {
      setIsCustom(true);
      setCustomValue('');
    } else {
      setIsCustom(false);
      setCustomValue('');
    }
  }, [value, options]);

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'Custom') {
      setIsCustom(true);
      setCustomValue('');
      onChange('Custom');
    } else {
      setIsCustom(false);
      setCustomValue('');
      onChange(selectedValue);
    }
  };

  const handleCustomInputChange = (inputValue: string) => {
    setCustomValue(inputValue);
    onChange(inputValue);
  };

  const handleCustomKeyPress = (e: React.KeyboardEvent) => {
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="space-y-3">
        {/* Dropdown for predefined options */}
        <select
          value={isCustom ? 'Custom' : value}
          onChange={(e) => handleSelectChange(e.target.value)}
          onKeyPress={onKeyPress}
          className={cn(
            'flex h-10 w-full rounded-md border border-secondary-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-red-500 focus-visible:ring-red-500' : '',
          )}
        >
          <option value="" disabled>Select an audience</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Custom input field */}
        {isCustom && (
          <input
            type="text"
            value={customValue}
            onChange={(e) => handleCustomInputChange(e.target.value)}
            onKeyPress={handleCustomKeyPress}
            placeholder="Enter your custom audience..."
            className={cn(
              'flex h-10 w-full rounded-md border border-secondary-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-red-500 focus-visible:ring-red-500' : '',
            )}
          />
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
