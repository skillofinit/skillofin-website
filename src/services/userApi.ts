/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/utiles/appUtils";

export async function getMeAPI(emailId?: string) {
  const response = await fetch(BASE_URL + "/getme", {
     method: "post",credentials:"include",
    body: JSON.stringify({
      authToken: localStorage.getItem("authToken"),
      emailId,
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function updateProfileAPI(data: any) {
  const response = await fetch(BASE_URL + "/updateprofile", {
     method: "post",credentials:"include",
    body: JSON.stringify({
      ...data,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function uplaodProfieImageAPI(data: any) {
  const response = await fetch(BASE_URL + "/updateprofile", {
     method: "post",credentials:"include",
    body: JSON.stringify({
      method: "profileImage",
      data: {
        image: data?.image,
      },
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function logoutAPI() {
  const response = await fetch(BASE_URL + "/logout", {
     method: "post",credentials:"include",
    body: JSON.stringify({
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function resetPasswordAPI(data: any) {
  const response = await fetch(BASE_URL + "/resetpassword", {
     method: "post",credentials:"include",
    body: JSON.stringify(data),
  });
  const serverData = await response.json();
  return serverData;
}
