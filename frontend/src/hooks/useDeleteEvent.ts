import { useMutation } from "@tanstack/react-query";
import { useAuth, useRefresh } from "../context/AuthContext";
import useAxiosPrivate from "./useAxiosPrivate";

const useDeleteEvent = (id: string) => {
  const refresh = useRefresh();
  const auth = useAuth();

  const axiosPrivate = useAxiosPrivate({ token: auth?.token!, refresh });
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: async (id: string) => {
      await axiosPrivate.delete(`/events/${id}`);
    },
  });

  const deleteEvent = async () => {
    mutate(id);
  };

  return { deleteEvent, isError, isPending, isSuccess };
};

export default useDeleteEvent;
