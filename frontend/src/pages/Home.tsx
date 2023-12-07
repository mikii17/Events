import {axiosClient} from "../api/axios_client";
import Events from "../components/Events";
import Hero from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const { data, isLoading, isError } = useQuery({
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
      ) : data.length === 0 ? (
        <div>No events</div>
      ) : (
        <div className="min-h-[100vh] py-10 px-4" id="events">
          <div className="max-w-[1024px] mx-auto flex flex-col items-center">
            <div className="self-end">
              <button className="bg-accent p-2 rounded-lg">Add Event</button>
            </div>
            <Events />
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
