export function isValidPhoneNumber(phoneNumber: string) {
  const phoneRegex = /^\d{9,}$/;
  return phoneRegex.test(phoneNumber);
}
