import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean; 
  large: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  large,
  onClick,
  ...rest
}) => {
  return (
    <button 
      disabled={disabled} 
      onClick={onClick} 
      className={`
        ${large ? 'w-[300px] h-[40px]' : 'w-[150px]'} 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#71B2EE] hover:bg-[#1D78F0] hover:text-white active:scale-90'} 
        transform transition duration-500 ease-in-out 
        font-bold border-none rounded-lg px-3 py-2`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
