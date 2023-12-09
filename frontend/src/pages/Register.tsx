import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { axiosClient } from "../api/axios_client";
import { Event } from "../types/event.type";
import { useState } from "react";
import useRegisterEvent from "../hooks/useRegisterEvent";
import Error from "./Error";
import { toast } from "react-toastify";

interface RegisterFormData {
  fullName: string;
  email: string;
}


const Register = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { isLoading, isError: isErrorLoading } = useQuery<Event, Error>({queryKey: ['event', id], queryFn: async () => {
    const response = await axiosClient.get(`/events/${id}`,{
      withCredentials: true,
    });
    return response.data;
  }});

  const { handleRegister, isError, isPending, isSuccess} = useRegisterEvent(formData.fullName, formData.email, id);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister();
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isErrorLoading) {
    return <Error />;
  }
  if (isSuccess) {
      toast.success("Registered successfully!");
    return <Navigate to={`/events/${id}`} replace/>;
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-secondary'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <form onSubmit={handleSubmit} className='bg-primary px-6 py-8 rounded shadow-md w-full flex flex-col gap-10'>
          <h1 className='text-2xl text-center text-primary'>Register</h1>
          {isError && <div className='text-red-500 text-center'>{"Error has occured! The email may already exist."}</div>}
          <div>
            <input
              type='text'
              className='block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none'
              name='fullName'
              value={formData.fullName}
              onChange={handleChange}
              placeholder='Full Name'
              required
            />

            <input
              type='email'
              className='block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              required
            />
          </div>

          <button className='bg-accent p-2 rounded-lg' disabled={isPending}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
