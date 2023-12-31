import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NoEvents = () => {
  const auth = useAuth();
  return (
    <div
      id="events"
      className="min-h-[100vh] px-4 flex flex-col justify-center items-center gap-16"
    >
      <img
        src='/box.svg'
        alt="Empty box icon"
        className="w-28 h-28"
        style={{ width: "7rem", height: "7rem" }}
      />
      <h2 className="font-bold text-2xl">No event available</h2>
      {auth !== null && (
        <Link to="/create-event" className="bg-accent p-2 px-4 rounded-lg">
          Create Event
        </Link>
      )}
    </div>
  );
};

export default NoEvents;
