export function removeNullValue<T>(data: T, allowFalsy = false): T {
  const cleanObject = {} as T;

  for (const key in data) {
    const item = data[key as keyof T];
    if (item !== null && item !== undefined) {
      if (item || allowFalsy) {
        cleanObject[key as keyof T] = item;
      }
    }
  }

  return cleanObject;
}
