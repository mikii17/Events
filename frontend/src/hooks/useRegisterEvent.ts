import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../api/axios_client";

const useRegisterEvent = (fullName: string, email: string, id?: string) => {
  const { mutate, isError, isIdle, isPending, isSuccess } = useMutation({
    mutationFn: async ({
      fullName,
      email,
      id,
    }: {
      fullName: string;
      email: string;
      id?: string;
    }) => {
      if (id == null) throw new Error("Event id is null");
      const response = await axiosClient.post(
        `registered-users/${id}`,
        {
          fullName,
          email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const handleRegister = async () => {
    mutate({ fullName, email, id });
  };

  return { handleRegister, isError, isIdle, isPending, isSuccess };
};

export default useRegisterEvent;
