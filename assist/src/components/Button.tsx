import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseClasses = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-[#00296c] hover:bg-[#003b99] text-white hover:shadow-md hover:shadow-[#003b99]/50 transform hover:-translate-y-1 transition-all duration-300';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-300 hover:bg-gray-400 text-gray-800';
      break;
    case 'danger':
      variantClasses = 'bg-red-500 hover:bg-red-700 text-white';
      break;
    default:
      variantClasses = 'bg-blue-500 hover:bg-blue-700 text-white';
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};