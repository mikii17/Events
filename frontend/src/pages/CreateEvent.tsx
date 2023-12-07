import { useState } from "react";
import { EventFormData } from "../types/eventFormData.type";
import useCreateEvent from "../hooks/useCreateEvent";
import { Navigate } from "react-router-dom";

const CreateEvent = () => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    link: "",
    when: "",
    address: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const { createEvent, isError, isPending, isSuccess, error } = useCreateEvent({
    formData,
    image,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("jhere")
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0])
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEvent();
  };

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary">
      {isError && <p className="text-red-500">{JSON.stringify(error)}</p>}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit}
          className="bg-primary px-6 py-8 rounded shadow-md w-full flex flex-col gap-10"
        >
          <h1 className="text-2xl text-center text-primary">Create Event</h1>
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
              required
            />
          </div>

          <button className="bg-accent p-2 rounded-lg" disabled={isPending}>
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEvent;
