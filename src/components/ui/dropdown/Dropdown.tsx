import type React from 'react';
import { useEffect, useRef } from 'react';

type Dropdown = {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

const Dropdown: React.FC<Dropdown> = ({ isOpen, onClose, children, className = '' }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 -right-5 lg:-right-6 rounded-bl-lg bg-ui-900 ${className}`}
    >
      {children}
    </div>
  );
};

export default Dropdown;
