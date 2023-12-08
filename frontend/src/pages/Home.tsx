import { axiosClient } from "../api/axios_client";
import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/event.type";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import NoEvents from "../components/NoEvents";
import { useAuth } from "../context/AuthContext";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const auth = useAuth();
  const [searchParams, _] = useSearchParams();
  const search = searchParams.get("search") || "";
  const queryUrl = search ? `events?search=${search}` : "events";
  const { data, isLoading, isError, refetch } = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: async () => {
      const data = await axiosClient.get(queryUrl, {
        withCredentials: true,
      });
      return data.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [search]);
  return (
    <main>
      <section className="h-screen bg-primary relative px-2">
        <Hero />
      </section>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div
          id="events"
          className="min-h-[100vh] mx-auto flex flex-col items-center justify-center gap-10"
        >
          <h2 className="text-xl text-primary">
            Oops! Sorry, an unexpected error has occurred.
          </h2>
          <p className="text-lg">Try refresh the page</p>
        </div>
      ) : data?.length === 0 ? (
        <NoEvents />
      ) : (
        <div className="min-h-[100vh] py-10 px-4" id="events">
          <div className="max-w-[1024px] mx-auto flex flex-col items-center">
            <div className="flex w-full justify-between items-center">
              {search && (
                <p className="">
                  <span className="text-primary">Showing result for: </span>
                  {search}
                </p>
              )}
              {auth != null && (
                <Link
                  to={"/create-event"}
                  className="bg-accent p-2 rounded-lg "
                >
                  Add Event
                </Link>
              )}
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
                  image={event.image}
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
