import type React from 'react';
import type { Options } from '@/types/commons.types';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';
import CheckIcon from '@/components/icons/Check';
import ChevronDownIcon from '@/components/icons/ChevronDown';

type SelectProps = {
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

const Select: React.FC<SelectProps> = ({
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
  const selected = options.find((opt) => opt.id === value) || null;

  return (
    <div>
      {/* LABEL */}
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* SELECT */}
      <Listbox
        value={selected}
        onChange={(option: Options) => onChange(option.id)}
        disabled={disabled}
      >
        <ListboxButton
          id={id}
          className={cn(
            'relative block w-full input text-left',
            selected ? 'text-white/90' : 'text-white/45',
            error && 'input-error',
            disabled && 'input-disabled',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {selected?.name ?? placeholder}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-3 right-4 w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={cn(
            'w-(--button-width) rounded-lg border border-white/10 bg-gray-900 p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0',
          )}
        >
          {options.map((opt) => (
            <ListboxOption
              key={opt.name}
              value={opt}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/5"
            >
              <CheckIcon className="invisible w-4 h-4 text-white/90 group-data-selected:visible" />
              <div className="text-sm">{opt.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>

      {/* ERROR */}
      {error && (
        <p id={`${id}-error`} className="input-error-text mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
