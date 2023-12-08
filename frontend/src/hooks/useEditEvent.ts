import { useMutation } from "@tanstack/react-query";
import { useAuth, useRefresh } from "../context/AuthContext";
import { EventFormData } from "../types/eventFormData.type";
import useAxiosPrivate from "./useAxiosPrivate";

const useEditEvent = ({
  formData,
  image,
  id,
}: {
  formData: EventFormData;
  image: File | null;
  id: string | undefined;
}) => {
  const refresh = useRefresh();
  const auth = useAuth();

  const axiosPrivate = useAxiosPrivate({ token: auth?.token!, refresh });
  const { mutate, isError, isPending, isSuccess, isIdle, error } = useMutation({
    mutationFn: async ({
      formData,
      image,
      id,
    }: {
      formData: EventFormData;
      image: File | null;
      id: string | undefined;
    }) => {
      console.log(formData, image, id);
      if (!id) throw new Error("No id provided");
      let data = await axiosPrivate.patch(`/events/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("image", image, image.name);
        console.log(imageFormData);

        data = await axiosPrivate.post(`/events/${id}/image`, imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      return data.data;
    },
  });

  const updateEvent = async () => {
    mutate({ formData, image, id });
  };

  return {
    updateEvent,
    isError,
    isPending,
    isSuccess,
    isIdle,
    error,
  };
};

export default useEditEvent;
