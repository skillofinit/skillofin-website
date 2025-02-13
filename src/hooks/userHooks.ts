import { getMeAPI } from "@/api/userApi";
import { useAppContext } from "@/utiles/AppContext";
import { useMutation } from "@tanstack/react-query";

export function useGetMe() {
  const { dispatch } = useAppContext();

  const {
    isPending,
    data,
    mutate: getMe,
  } = useMutation({
    mutationFn: () => getMeAPI(),
    onSuccess(data) {
      if (data?.message === "SUCCESS") {
        dispatch({
          type: "setUser",
          payload: {
            loggedIn: true,
            data: data?.data,
          },
        });
      }
    },
  });

  return {
    isPending,
    data,
    getMe,
  };
}
