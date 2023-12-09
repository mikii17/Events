import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { Event } from "../types/event.type";
import { axiosClient } from "../api/axios_client";
import { useEffect, useState } from "react";
import useEditEvent from "../hooks/useEditEvent";
import { toast } from "react-toastify";

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError: isErrorOnLoading } = useQuery<Event, Error>({
    queryKey: ["events", id],
    queryFn: async () => {
      const data = await axiosClient.get(`/events/${id}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    when: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const { updateEvent, error, isError, isPending, isSuccess} = useEditEvent({formData, image, id});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEvent();
  }


  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        description: data.description,
        link: data.link,
        when: data.when,
        address: data.address,
      });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isErrorOnLoading) {
    return <div>Error</div>;
  }
  if (isSuccess) {
    toast.success("Event updated successfully!");
    return <Navigate to={`/events/${id}`} />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary">
      {isError && <p className="text-red-500 text-center">{error?.message || "Error occured"}</p>}
      <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-primary px-6 py-8 rounded shadow-md w-full flex flex-col gap-10"
        >
          <h1 className="text-2xl text-center text-primary">Update Event</h1>
          <div>
            <input
              type="text"
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="link"
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="link"
              placeholder="link"
              value={formData.link}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="when"
              placeholder="Date"
              value={formData.when}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              className="block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none"
              name="image"
              placeholder="Image"
              onChange={handleImageChange}
            />
          </div>

          <button className="bg-accent p-2 rounded-lg" disabled={isPending}>
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditEvent;
