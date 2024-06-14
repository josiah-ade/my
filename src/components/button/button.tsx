import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  // onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
  primary,
  secondary,
  danger,
  disabled,
  icon,
  ...props
}) => {
  const baseStyles =
    "px-5 py-2 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryStyles = "bg-primary text-white hover:bg-primary focus:ring-primary";
  const secondaryStyles = "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500";
  const dangerStyles = "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonClasses = classNames(
    baseStyles,
    {
      [primaryStyles]: primary,
      [secondaryStyles]: secondary,
      [dangerStyles]: danger,
      [disabledStyles]: disabled,
    },
    className
  );

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
