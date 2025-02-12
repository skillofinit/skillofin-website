import { userSignUpPayloadType } from "@/types/authTypes";
import { BASE_URL } from "@/utiles/appUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function signupApi(values: userSignUpPayloadType) {
  const response = await fetch(BASE_URL + "/signup", {
    method: "post",
    body: JSON.stringify(values),
  });
  const serverData = await response.json();
  return serverData;
}




export async function loginApi(values: any) {
  const response = await fetch(
    "https://spendtrackerbackend.vercel.app/api/login",
    {
      method: "post",
      body: JSON.stringify(values),
    }
  );
  const serverData = await response.json();
  return serverData;
}
