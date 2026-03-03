/**
 * Format a phone number for display
 * Converts +16503918238 to (650) 391-8238
 * Uses non-breaking space (\u00A0) and non-breaking hyphen (\u2011) to prevent line breaks
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Use non-breaking space and non-breaking hyphen to prevent line breaks
  const nbsp = '\u00A0';
  const nbHyphen = '\u2011';
  
  // Handle US numbers with country code (11 digits starting with 1)
  if (digits.length === 11 && digits.startsWith('1')) {
    const areaCode = digits.slice(1, 4);
    const prefix = digits.slice(4, 7);
    const lineNumber = digits.slice(7);
    return `(${areaCode})${nbsp}${prefix}${nbHyphen}${lineNumber}`;
  }
  
  // Handle 10-digit US numbers
  if (digits.length === 10) {
    const areaCode = digits.slice(0, 3);
    const prefix = digits.slice(3, 6);
    const lineNumber = digits.slice(6);
    return `(${areaCode})${nbsp}${prefix}${nbHyphen}${lineNumber}`;
  }
  
  // Return original if format is unclear
  return phone;
}

