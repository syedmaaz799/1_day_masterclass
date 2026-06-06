/**
 * Dial codes for the registration phone field (default India / IST audience).
 */

export type PhoneCountry = {
  code: string;
  dial: string;
  label: string;
};

export const phoneCountries: readonly PhoneCountry[] = [
  { code: "IN", dial: "+91", label: "India (+91)" },
  { code: "US", dial: "+1", label: "United States (+1)" },
  { code: "GB", dial: "+44", label: "United Kingdom (+44)" },
  { code: "AE", dial: "+971", label: "United Arab Emirates (+971)" },
  { code: "SG", dial: "+65", label: "Singapore (+65)" },
  { code: "AU", dial: "+61", label: "Australia (+61)" },
  { code: "CA", dial: "+1", label: "Canada (+1)" },
  { code: "DE", dial: "+49", label: "Germany (+49)" },
  { code: "FR", dial: "+33", label: "France (+33)" },
  { code: "SA", dial: "+966", label: "Saudi Arabia (+966)" },
  { code: "BD", dial: "+880", label: "Bangladesh (+880)" },
  { code: "PK", dial: "+92", label: "Pakistan (+92)" },
  { code: "LK", dial: "+94", label: "Sri Lanka (+94)" },
  { code: "NP", dial: "+977", label: "Nepal (+977)" },
  { code: "MY", dial: "+60", label: "Malaysia (+60)" },
  { code: "PH", dial: "+63", label: "Philippines (+63)" },
  { code: "ID", dial: "+62", label: "Indonesia (+62)" },
  { code: "QA", dial: "+974", label: "Qatar (+974)" },
  { code: "KW", dial: "+965", label: "Kuwait (+965)" },
  { code: "OM", dial: "+968", label: "Oman (+968)" },
  { code: "BH", dial: "+973", label: "Bahrain (+973)" },
  { code: "NZ", dial: "+64", label: "New Zealand (+64)" },
  { code: "ZA", dial: "+27", label: "South Africa (+27)" },
  { code: "NG", dial: "+234", label: "Nigeria (+234)" },
  { code: "KE", dial: "+254", label: "Kenya (+254)" },
  { code: "JP", dial: "+81", label: "Japan (+81)" },
  { code: "KR", dial: "+82", label: "South Korea (+82)" },
  { code: "CN", dial: "+86", label: "China (+86)" },
  { code: "HK", dial: "+852", label: "Hong Kong (+852)" },
  { code: "IE", dial: "+353", label: "Ireland (+353)" },
  { code: "NL", dial: "+31", label: "Netherlands (+31)" },
  { code: "CH", dial: "+41", label: "Switzerland (+41)" },
  { code: "SE", dial: "+46", label: "Sweden (+46)" },
  { code: "IT", dial: "+39", label: "Italy (+39)" },
  { code: "ES", dial: "+34", label: "Spain (+34)" },
  { code: "BR", dial: "+55", label: "Brazil (+55)" },
  { code: "MX", dial: "+52", label: "Mexico (+52)" },
] as const;

export const defaultPhoneCountryCode = "IN";

export function dialCodeForCountry(code: string): string {
  return phoneCountries.find((c) => c.code === code)?.dial ?? "+91";
}
