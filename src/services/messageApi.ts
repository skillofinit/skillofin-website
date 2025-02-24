/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/utiles/appUtils";

export async function sendMessageAPI(data: any) {
  const response = await fetch(BASE_URL + "/chat", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      message: data?.message,
      receiver: data?.receiver,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
export async function createMileStoneAPI(data: any) {
  const response = await fetch(BASE_URL + "/milestone", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({ ...data, emailId: localStorage.getItem("emailId") }),
  });
  const serverData = await response.json();
  return serverData;
}
