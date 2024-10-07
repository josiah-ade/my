import { ChangeEvent, HTMLInputTypeAttribute, ReactNode, useState } from "react";

interface IProps {
  name: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  hintText?: string;
  errorText?: string;
  onChange?: (value: string) => void;
  inputClass?: string;
  labelClass?: string;
  hintClass?: string;
  errorClass?: string;
  placeholder?: string;
  className?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export default function TextInput(props: IProps) {
  const [value, setValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setValue(value);
    if (props.onChange) props.onChange(value);
  }

  return (
    <div className={props.className ?? ""}>
      {props.label && (
        <label className={props.labelClass ?? "text-sm font-medium"} htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <div
        className={`relative border mt-2 rounded flex gap-2 bg-white items-center border-gray-300 ${
          props.inputClass ?? "py-3.5 px-4"
        }`}
      >
        {props.prefixIcon && props.prefixIcon}

        <input
          type={props.type}
          className={`w-full border-none outline-none focus:outline-none`}
          name={props.name}
          placeholder={props.placeholder}
          onChange={handleChange}
          value={props.value ?? value}
        />

        {props.suffixIcon && props.suffixIcon}
      </div>
      {props.hintText && <label className={props.hintClass ?? "text-sm text-gray-500"}>{props.hintText}</label>}
      {props.errorText && <label className={props.errorClass ?? "text-sm text-error-500"}>{props.errorText}</label>}
    </div>
  );
}
