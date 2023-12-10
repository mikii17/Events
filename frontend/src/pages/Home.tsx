import { axiosClient } from "../api/axios_client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Event } from "../types/event.type";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import NoEvents from "../components/NoEvents";
import { useAuth } from "../context/AuthContext";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import EventCardSkeleton from "../components/EventCardSkeleton";
import Footer from "../components/Footer";

interface QueryData {
  data: Event[];
  nextPage: number;
}
const Home = () => {
  const auth = useAuth();
  const [searchParams, _] = useSearchParams();
  const search = searchParams.get("search") || "";
  const queryUrl = search ? `events?search=${search}` : "events";
  const { data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery<QueryData, Error>({
    queryKey: ["events", "infinite"],
    initialPageParam: 1,
    getNextPageParam: prevData => prevData.nextPage || undefined,
    queryFn: async ({pageParam = 1}) => {
      const queryUrlWithPage = queryUrl.includes("search=") ? `${queryUrl}&page=${pageParam}`: `${queryUrl}?page=${pageParam}` ;
      const data = await axiosClient.get(queryUrlWithPage, {
        withCredentials: true,
      });
      return data.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [search]);
  return (
    <>
    <main>
      <section className="h-screen bg-primary relative px-2">
        <Hero />
      </section>
      {isLoading ? (
        <div className="grid max-w-[1024px] mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-16 py-10 px-4" >
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
        </div>
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
      ) : data?.pages[0]?.data.length === 0 ? (
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
              {data?.pages.flatMap(data => data.data).map((event) => (
                <EventCard
                  key={event._id}
                  date={event.when}
                  description={event.description}
                  id={event._id}
                  title={event.title}
                  image={event.image}
                />
              ))}
              { isFetchingNextPage && (
                <>
                <EventCardSkeleton />
                <EventCardSkeleton/>
                <EventCardSkeleton/>
                </>
              )
              }
            </div>
              {hasNextPage && (
                <button className="bg-accent p-2 rounded-lg" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                  Load More
                </button>
              )}
          </div>
        </div>
      )}
    </main>
    <Footer />
    </>
  );
};

export default Home;
