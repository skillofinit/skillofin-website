/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/utiles/appUtils";

export async function createPostAPI(data: any) {
  const response = await fetch(BASE_URL + "/post", {
     method: "post",credentials:"include",
    body: JSON.stringify({
      ...data,
      authToken: localStorage.getItem("authToken"),
    }),
  });
  const serverData = await response.json();
  return serverData;
}