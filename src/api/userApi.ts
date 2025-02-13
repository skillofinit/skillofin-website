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
