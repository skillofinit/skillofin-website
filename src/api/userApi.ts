/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/utiles/appUtils";

export async function getMeAPI() {
  const response = await fetch(BASE_URL + "/getme", {
    method: "post",
    body: JSON.stringify({
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function updateProfileAPI(data: any) {
  const response = await fetch(BASE_URL + "/updateprofile", {
    method: "post",
    body: JSON.stringify({
      ...data,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function sendMessageAPI(data: any) {
  const response = await fetch(BASE_URL + "/chat", {
    method: "post",
    body: JSON.stringify({
      message:data?.message,
      receiver:data?.receiver,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
