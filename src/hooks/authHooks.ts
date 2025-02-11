/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginApi, signupApi } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  const {
    mutate: signup,
    isPending,
    data,
  } = useMutation({ mutationFn: (values) => signupApi(values) });
  return { signup, isPending, data };
}
export function useLogin() {
  const {
    mutate: login,
    isPending,
    data,
  } = useMutation({ mutationFn: (values) => loginApi(values) });
  return { login, isPending, data };
}



