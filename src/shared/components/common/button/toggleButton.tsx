import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  activeColor?: string;
  defaultColor?: string;
  disabledColor?: string;
}

export default function ToggleButton({ isActive, activeColor, defaultColor, disabledColor, ...props }: IProps) {
  return (
    <button
      className={`relative inline-flex items-center h-6 rounded-full w-11 disabled:${disabledColor ?? "opacity-50"} ${
        isActive ? activeColor ?? "bg-primary" : defaultColor ?? "bg-gray-200"
      }`}
      {...props}
    >
      <span
        className={`${
          isActive ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </button>
  );
}
