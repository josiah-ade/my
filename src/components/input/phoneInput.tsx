import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import Select from "./selectInput";
import { getCountryPhoneCodes } from "@/core/const/countryCodes";

interface IProps {
  name: string;
  value?: string;
  codeValue?: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  hintText?: string;
  errorText?: string;
  onChange?: (value: string) => void;
  onCodeChange?: (value: string) => void;
  inputClass?: string;
  labelClass?: string;
  hintClass?: string;
  errorClass?: string;
  placeholder?: string;
}

const countryCodes = getCountryPhoneCodes();

export default function PhoneInput(props: IProps) {
  const [phoneNumber, setPhoneNumber] = useState(props.value ?? "");
  const [countryCode, setCountryCode] = useState(props.codeValue ?? "");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setPhoneNumber(value);
    props.onChange && props.onChange(value);
  }

  function handleCountryCodeChange(value: string) {
    setCountryCode(value);
    props.onCodeChange && props.onCodeChange(value);
  }

  return (
    <div>
      {props.label && (
        <label className={props.labelClass ?? "text-sm font-medium"} htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <div className="flex gap-4">
        <Select
          options={countryCodes}
          controlField={"value"}
          displayField={"label"}
          name="Country Code"
          value={props.codeValue ?? countryCode}
          onChange={handleCountryCodeChange} // Pass the change handler for the country code
        />
        <input
          type={props.type}
          className={`w-full flex-grow  mt-2 border border-gray-300 rounded focus:outline-none ${
            props.inputClass ?? "py-3.5 px-4"
          }`}
          name={props.name}
          placeholder={props.placeholder}
          onChange={handleChange}
          value={props.value ?? phoneNumber}
        />
      </div>
      {props.hintText && <label className={props.hintClass ?? "text-sm text-gray-500"}>{props.hintText}</label>}
      {props.errorText && <label className={props.errorClass ?? "text-sm text-error-500"}>{props.errorText}</label>}
    </div>
  );
}
