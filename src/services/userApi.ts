/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/utiles/appUtils";

export async function getMeAPI(emailId?: string) {
  const response = await fetch(BASE_URL + "/getme", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      emailId: localStorage.getItem("emailId"),
      email: emailId,
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function updateProfileAPI(data: any) {
  const response = await fetch(BASE_URL + "/updateprofile", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      ...data,
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function uplaodProfieImageAPI(data: any) {
  const response = await fetch(BASE_URL + "/updateprofile", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      method: "profileImage",
      data: {
        image: data?.image,
      },
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function logoutAPI() {
  const response = await fetch(BASE_URL + "/logout", {
    method: "post",
    credentials: "include",
    body: JSON.stringify({
      emailId: localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function resetPasswordAPI(data: any) {
  const response = await fetch(BASE_URL + "/resetpassword", {
    method: "post",
    credentials: "include",
    body: JSON.stringify(data),
  });
  const serverData = await response.json();
  return serverData;
}

export async function blogsAPI(data:any) {
  const response = await fetch(BASE_URL + "/blogs", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      emailId: data ? localStorage.getItem("emailId") : null,
    }),
  });
  const serverData = await response.json();
  return serverData;
}
export async function reAuth() {
  const response = await fetch(BASE_URL + "/reauth", {
    method: "POST",
    body: JSON.stringify({
      emailId:localStorage.getItem("emailId"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
