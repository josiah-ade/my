export function dateFormatter(dateString: string): string {
  const date = new Date(dateString);
  if (!date.getTime()) return dateString;
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", { ...options });
}
