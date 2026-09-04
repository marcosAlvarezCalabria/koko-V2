export function buildWhatsappUrl(telephone: string, message: string): string {
  const phoneNumber = normalizePhoneNumber(telephone);
  const params = new URLSearchParams({ text: message });

  return `https://wa.me/${phoneNumber}?${params.toString()}`;
}

function normalizePhoneNumber(telephone: string): string {
  const digits = telephone.replace(/\D/g, "");

  return digits.startsWith("00") ? digits.slice(2) : digits;
}