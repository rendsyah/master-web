import type React from 'react';
import type { Options } from '@/types/commons.types';
import { useState } from 'react';
import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';
import CheckIcon from '@/components/icons/Check';
import ChevronDownIcon from '@/components/icons/ChevronDown';

type ComboboxProps = {
  id: string;
  label?: string;
  placeholder?: string;
  options: Options[];
  className?: string;
  value: string | number | null;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string | number | null) => void;
};

const Combobox: React.FC<ComboboxProps> = ({
  id,
  label,
  placeholder = 'Choose Option',
  options,
  className = '',
  value,
  error,
  required,
  disabled,
  onChange,
}) => {
  const [query, setQuery] = useState('');

  const selected = options.find((opt) => opt.id === value) || null;

  const filterOptions =
    query === ''
      ? options
      : options.filter((opt) => {
          return opt.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      {/* LABEL */}
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* COMBOBOX */}
      <HeadlessCombobox
        value={selected}
        onChange={(option: Options | null) => {
          if (!option) return onChange(null);
          onChange(option.id);
        }}
        onClose={() => setQuery('')}
        disabled={disabled}
      >
        <div className="relative">
          <ComboboxInput
            id={id}
            className={cn(
              'w-full input',
              error && 'input-error',
              disabled && 'input-disabled',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            displayValue={(opt: Options) => opt?.name || ''}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-4">
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={cn(
            'w-(--input-width) rounded-lg border border-white/10 bg-gray-900 p-1 [--anchor-gap:--spacing(1)] empty:invisible',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0',
          )}
        >
          {filterOptions.map((opt) => (
            <ComboboxOption
              key={opt.id}
              value={opt}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/5"
            >
              <CheckIcon className="invisible w-4 h-4 text-white/90 group-data-selected:visible" />
              <div className="text-sm">{opt.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </HeadlessCombobox>

      {/* ERROR */}
      {error && (
        <p id={`${id}-error`} className="input-error-text mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default Combobox;
