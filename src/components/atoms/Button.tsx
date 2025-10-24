import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({ type = 'button', onClick, disabled = false, children }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="px-4 py-2 border"
      >
        {children}
      </button>
    );
  }
);
