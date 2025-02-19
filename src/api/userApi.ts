/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/utiles/appUtils";

export async function getMeAPI(emailId?:string) {
  const response = await fetch(BASE_URL + "/getme", {
    method: "post",
    body: JSON.stringify({
      authToken: localStorage.getItem("authToken"),
      emailId
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
      message: data?.message,
      receiver: data?.receiver,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
export async function uplaodProfieImageAPI(data: any) {
  const response = await fetch(BASE_URL + "/updateprofile", {
    method: "post",
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
    method: "post",
    body: JSON.stringify({
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}

export async function postJobAPI(data:any) {
  const response = await fetch(BASE_URL + "/postjob", {
    method: "post",
    body: JSON.stringify({
      ...data,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
export async function getJobsAPI() {
  const response = await fetch(BASE_URL + "/jobs");
  const serverData = await response.json();
  return serverData;
}
export async function submitBidAPI(data:any) {
  const response = await fetch(BASE_URL + "/bid", {
    method: "post",
    body: JSON.stringify({
      ...data,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
export async function createPostAPI(data:any) {
  const response = await fetch(BASE_URL + "/post", {
    method: "post",
    body: JSON.stringify({
      ...data,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}
export async function deletePostedAPI(data:any) {
  const response = await fetch(BASE_URL + "/delete", {
    method: "post",
    body: JSON.stringify({
      ...data,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}