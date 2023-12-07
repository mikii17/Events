import { useMutation } from "@tanstack/react-query";
import { EventFormData } from "../types/eventFormData.type";
import useAxiosPrivate from "./useAxiosPrivate";
import { useAuth, useRefresh } from "../context/AuthContext";

const useCreateEvent = ({
  formData,
  image,
}: {
  formData: EventFormData;
  image: File | null;
}) => {
  const refresh = useRefresh();
  const auth = useAuth();

  const axiosPrivate = useAxiosPrivate({ token: auth?.token!, refresh });
  const { mutate, isError, isPending, isSuccess, isIdle, error } = useMutation({
    mutationFn: async ({
      formData,
      image,
    }: {
      formData: EventFormData;
      image: File | null;
    }) => {
      if (image === null) throw new Error("Image is null");
      let data = await axiosPrivate.post("/events", { ...formData, image: "" });
      const eventId = data.data._id;
      const imageFormData = new FormData();
      imageFormData.append("image", image, image.name);
      console.log(imageFormData);

      data = await axiosPrivate.post(
        `/events/${eventId}/image`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
  });

  const createEvent = async () => {
    mutate({ formData, image });
  };

  return { createEvent, isError, isPending, isSuccess, isIdle, error };
};

export default useCreateEvent;
