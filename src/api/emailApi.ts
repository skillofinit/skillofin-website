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
  return serverData?.message === "emailSendSuccess"?"SUCCESS":"ERROR";
}
