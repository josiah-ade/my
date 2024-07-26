import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";

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
}

export default function TextInput(props: IProps) {
  const [value, setValue] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setValue(value);
    props.onChange && props.onChange(value);
  }

  return (
    <div>
      {props.label && (
        <label className={props.labelClass ?? "text-sm font-medium"} htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <input
        type={props.type}
        className={`w-full  mt-2 border border-gray-300 rounded focus:outline-none ${
          props.inputClass ?? "py-3.5 px-4"
        }`}
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleChange}
        value={props.value ?? value}
      />
      {props.hintText && <label className={props.hintClass ?? "text-sm text-gray-500"}>{props.hintText}</label>}
      {props.errorText && <label className={props.errorClass ?? "text-sm text-error-500"}>{props.errorText}</label>}
    </div>
  );
}
