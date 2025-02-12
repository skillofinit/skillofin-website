// export const BASE_URL = "http://localhost:3000/api";
export const BASE_URL = "https://skillofinapi.vercel.app/api";

//company urls
export const COMPANY_EMAIL = "contact@Skillofin.com";
export const COMPANY_FACEBOOK =
  "https://www.facebook.com/profile.php?id=61571965832291";
export const COMPANY_INSTAGRAM = "https://www.instagram.com/skill_ofin/";
export const COMPANY_TWITTER = "https://x.com/skillofin";
export const COMPANY_LINKEDIN =
  "https://www.linkedin.com/company/105638180/admin/dashboard/";

export const COMPANY_PINTEREST = "https://ca.pinterest.com/business/hub/";

export function decodeString(value: string) {
  return Buffer.from(value, "base64").toString("utf-8");
}

export function getEmailId(): string {
  const emailId = decodeString(localStorage.getItem("authToken") ?? "");
  return emailId ?? "";
}
