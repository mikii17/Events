import { axiosClient } from "../api/axios_client";
import Hero from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/event.type";
import EventCard from "../components/EventCard";
const Home = () => {
  const { data, isLoading, isError } = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: async () => {
      const data = await axiosClient.get("events", {
        withCredentials: true,
      });
      return data.data;
    },
  });
  return (
    <main>
      <section className="h-screen bg-primary relative px-2">
        <Hero />
      </section>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : data?.length === 0 ? (
        <div>No events</div>
      ) : (
        <div className="min-h-[100vh] py-10 px-4" id="events">
          <div className="max-w-[1024px] mx-auto flex flex-col items-center">
            <div className="self-end">
              <button className="bg-accent p-2 rounded-lg">Add Event</button>
            </div>
            {/* <Events /> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-16">
              {data?.map((event) => (
                <EventCard
                  key={event._id}
                  date={event.when}
                  description={event.description}
                  id={event._id}
                  title={event.title}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
