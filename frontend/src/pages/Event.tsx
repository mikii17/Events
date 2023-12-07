import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../api/axios_client";
import { Event as EventType } from "../types/event.type";

const Event = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<EventType, Error>({
    queryKey: ["events", id],
    queryFn: async () => {
        console.log("id:", id)
        const data = await axiosClient.get(`events/${id}`, {
          withCredentials: true,
        });
        return data.data;      
    },
  });

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center  px-5 py-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center gap-10">
          <section className="flex-[1]">
            <div className=" bg-lightGreen flex justify-center items-center p-16 rounded-lg">
              <img
                src={data?.image || "/event.svg"}
                alt="Event"
                width={"170px"}
                height={"170px"}
              />
            </div>
          </section>

          <section className="flex-[3] flex flex-col gap-16">
            <div className="flex items-center justify-between">
              <h1 className="text-primary text-xl">{data?.title}</h1>
              <div className="flex gap-3">
                <button className="underline">Edit</button>
                <button className="underline">Delete</button>
              </div>
            </div>

            <div>
              <p>
                {data?.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p>{data?.address}</p>
              <p>{data?.when}</p>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
              <button className="bg-accent p-2 px-4 rounded-lg">RSVP</button>
              <Link to={data?.link || ""}>Check out the link</Link>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Event;
