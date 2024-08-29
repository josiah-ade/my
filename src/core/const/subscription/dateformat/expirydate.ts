
export function formatExpiryDate(expiryDate: string): string {
    try {
      const parsedDate = new Date(expiryDate);
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return new Intl.DateTimeFormat('en-GB', options).format(parsedDate).replace(' at', ' at');
    } catch (error) {
      return "Invalid expiry date"; 
    }
  }