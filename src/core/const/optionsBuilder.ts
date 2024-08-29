import { IGenericOption } from "@/typings/interface/input";

interface DelayOptionParams {
  unit: string;
  start: number;
  end: number;
  step: number;
  multiplier: number;
}

export function buildDelayOptions() {
  const options: IGenericOption[] = [];

  options.push({ label: "No Delay", value: "0" });

  for (let i = 1; i <= 10; i++) {
    options.push({ label: `${i} second${i > 1 ? "s" : ""}`, value: `${i / 60}` });
  }

  for (let i = 15; i <= 60; i += 5) {
    options.push({ label: `${i} seconds`, value: `${i / 60}` });
  }

  for (let i = 1; i <= 10; i++) {
    options.push({ label: `${i} minute${i > 1 ? "s" : ""}`, value: `${i}` });
  }

  return options;
}

export function buildPercentageOptions({ start = 0, end = 100, step = 10 }: Partial<DelayOptionParams>) {
  const options: IGenericOption[] = [];
  for (let i = start; i <= end; i += step) {
    const label = `${i}%`;
    options.push({ label, value: `${i}` });
  }
  return options;
}
