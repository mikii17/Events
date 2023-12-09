import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../api/axios_client";
import { Event as EventType } from "../types/event.type";
import DeleteModal from "../components/DeleteModal";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Error from "./Error";
import UserList from "../components/UserList";

const Event = () => {
  const { id } = useParams<{ id: string }>();

  const [open, setOpen] = useState<boolean>(false);

  const auth = useAuth();

  const { data, isLoading, isError } = useQuery<EventType, Error>({
    queryKey: ["events", id],
    queryFn: async () => {
      const data = await axiosClient.get(`events/${id}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  return (
    <>
      <DeleteModal
        open={open}
        close={() => setOpen((prevOpen) => !prevOpen)}
        id={data?._id!}
      />
      <main className=" ">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <Error />
        ) : (
          <div className="bg-primary">
            <div className="min-h-screen max-w-[1024px] bg-primary px-5 py-10 mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
              <section className="flex-[1] self-center md:self-start">
                <div className=" bg-lightGreen flex justify-center items-center h-[300px] min-w-[300px] rounded-lg overflow-hidden border-2 border-primary" >
                  <img
                    src={data?.image ? `http://localhost:3000/${data?.image}` : "/event.svg"}
                    alt="Event"
                    width={"170px"}
                    height={"170px"}
                    className='object-cover object-top h-full w-full block'
                  />
                </div>
              </section>

              <section className="flex-[3] flex flex-col gap-16">
                <div className="flex items-center justify-between">
                  <h1 className="text-primary text-xl font-bold">
                    {data?.title}
                  </h1>
                  {auth != null && (
                    <div className="flex gap-3">
                      <Link
                        to={`/edit-event/${data?._id}`}
                        className="underline hover:no-underline focus:no-underline"
                      >
                        Edit
                      </Link>
                      <button
                        className="underline hover:no-underline focus:no-underline"
                        onClick={() => setOpen(true)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <p>{data?.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center justify-center">
                    <img
                      src="/location.svg"
                      alt="location icon"
                      className="w-7 h-7"
                    />
                    <p>{data?.address}</p>
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <img
                      src="/calendar.svg"
                      alt="calendar icon"
                      className="w-7 h-7"
                    />
                    <p>{data?.when}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-10 justify-center items-center">
                  <Link
                    to={`/register/${data?._id}`}
                    className="bg-accent p-3 px-5 rounded-lg transition-all hover:rounded-full hover:bg-accent/75 focus:rounded-full"
                  >
                    RSVP
                  </Link>
                  <Link
                    to={data?.link || ""}
                    target="_blank"
                    className="underline hover:no-underline"
                  >
                    Check out the link
                  </Link>
                 {auth != null && <UserList eventId={data?._id!} />}
                </div>
              </section>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Event;
