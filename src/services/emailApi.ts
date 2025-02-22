import { BASE_URL } from "@/utiles/appUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function sendEmailAPI(body: {
  toEmail: string;
  body: string;
  title: string;
  subject: string;
}) {
  const response = await fetch("https://freeemailapi.vercel.app/sendEmail/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(body),
  });
  const serverData = await response.json();
  return serverData?.message === "emailSendSuccess" ? "SUCCESS" : "ERROR";
}

export async function contactUsAPI(body: {
  emailId: string;
  phone: string;
  fullName: string;
}) {
  await fetch(BASE_URL + "/contact-us", {
    method: "post",
    body: JSON.stringify(body),
  });
}
