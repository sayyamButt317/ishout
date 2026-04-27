export const normalizePhoneNumberForDisplay = (
  phone: string | undefined | null
): string | undefined => {
  if (!phone || phone.trim() === '') {
    return undefined;
  }
  
  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  if (/^[1-9]\d{6,14}$/.test(cleaned)) {
    return `+${cleaned}`;
  }
  
  return undefined;
};

export const removePlusPrefix = (phone: string | undefined | null): string => {
  if (!phone || phone.trim() === '') {
    return '';
  }
  
  const trimmed = phone.trim();
  
  if (trimmed.startsWith('+')) {
    return trimmed.substring(1);
  }
  
  return trimmed;
};

export const getPhoneDigits = (phone: string | undefined | null): string => {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
};

export const isValidPhoneLength = (phone: string | undefined | null): boolean => {
  const digits = getPhoneDigits(phone);
  return digits.length >= 7 && digits.length <= 15;
};

