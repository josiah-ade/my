import { IGenericOption } from "@/typings/interface/input";
import { CountryProperty, customList } from "country-codes-list";

export function getCountryPhoneCodes(): IGenericOption[] {
  const list = customList(
    "countryCallingCode" as CountryProperty,
    "{countryNameEn} +({countryCallingCode})"
  );
  return Object.keys(list)
    .map((key) => ({ label: list[key as keyof typeof list], value: key }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
