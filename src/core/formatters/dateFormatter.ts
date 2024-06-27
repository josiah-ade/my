export function dateFormatter(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }
): string {
  const date = new Date(dateString);
  if (!date.getTime()) return dateString;
  return date.toLocaleDateString("en-GB", { ...options });
}
