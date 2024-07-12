export function isPhone(phoneNumber: string): string | null {
  if (!phoneNumber) return null;
  const formattedNumber = phoneNumber.startsWith("+") ? phoneNumber.slice(1) : phoneNumber;

  // Check if the remaining string is a number
  const isNumber = /^\d+$/.test(formattedNumber);

  return isNumber ? formattedNumber : null;
}

export function isValidName(name: string): boolean {
  // Check if the name is not empty and contains only valid characters
  const namePattern = /^[a-zA-Z\s'-]+$/;
  return namePattern.test(name.trim());
}
