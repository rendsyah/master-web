import type React from 'react';

const ChevronUpDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
      />
    </svg>
  );
};

export default ChevronUpDownIcon;
