// Valid promo codes for premium unlock
const VALID_PROMO_CODES = [
  "DEV-UNLOCK-2025", // Developer master key
  "FF-PREMIUM-4F92-9ABQ-2025",
  "FF-PREMIUM-8K3L-2MNX-2025",
  "FF-PREMIUM-7P5T-6RWY-2025",
  "FF-PREMIUM-3J9H-1QZV-2025",
  "FF-PREMIUM-5D2B-4CGF-2025",
];

export const validatePromoCode = (code: string): boolean => {
  const normalizedCode = code.trim().toUpperCase();
  return VALID_PROMO_CODES.includes(normalizedCode);
};

export const generatePromoCode = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segments = 4;
  const segmentLength = 4;
  
  const code = Array.from({ length: segments }, () => {
    return Array.from(
      { length: segmentLength },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }).join("-");
  
  return `FF-PREMIUM-${code}-2025`;
};
