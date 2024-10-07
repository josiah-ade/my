import { ChangeEvent, useState } from "react";

interface IProps<T> {
  name: string;
  options: T[];
  controlField: keyof T;
  displayField: keyof T;
  value?: string;
  label?: string;
  hintText?: string;
  onSelect?: (selected?: T) => void;
  onChange?: (value: string) => void;
  inputClass?: string;
  labelClass?: string;
  hintClass?: string;
  className?: string;
}

export default function Select<T>(props: IProps<T>) {
  const [value, setValue] = useState(props.value ?? "");

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value, selectedOptions } = event.target;
    const index = parseInt(selectedOptions[0]?.getAttribute("data-index") ?? "-1") ?? -1;
    setValue(value);

    const selected = props.options[index];
    if (props.onSelect) props.onSelect(selected);
    if (props.onChange) props.onChange(value);
  }

  const isSelected = !!(props.value ?? value);

  return (
    <div className={props.className ?? ""}>
      {props.label && (
        <label className={`text-gray-900 text-sm font-medium ${props.labelClass}`} htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <select
        className={`w-full border mt-2 bg-white ${
          isSelected ? "text-gray-900" : "text-gray-400"
        } border-gray-300 rounded focus:outline-none ${props.inputClass ?? "py-4 px-4"}`}
        name={props.name}
        onChange={handleChange}
        value={props.value ?? value}
      >
        <option value={""} className="p-2 capitalize text-gray-400">
          {props.options.length ? `Select ${props.name} ` : `No ${props.name} available`}
        </option>

        {props.options.map((item, index) => (
          <option
            className="text-gray-900"
            key={item[props.controlField] as string}
            value={item[props.controlField] as string}
            data-index={index}
          >
            {item[props.displayField] as string}
          </option>
        ))}
      </select>
      {props.hintText && <p className={props.hintClass ?? "text-sm text-gray-500"}>{props.hintText}</p>}
    </div>
  );
}
