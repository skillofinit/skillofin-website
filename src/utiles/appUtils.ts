// export const BASE_URL = "http://localhost:3001/api";
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

export function timeAgo(isoDate: string): string {
  const now = new Date();
  const past = new Date(isoDate);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hr ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
}

export function truncateString(str: string, maxLength: number): string {
  return str?.length <= maxLength ? str : str?.slice(0, maxLength) + "...";
}
