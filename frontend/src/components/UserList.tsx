import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../api/axios_client";
import UserCard from "./UserCard";
interface User {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
}
const UserList = ({eventId}:{eventId: string}) => {
    const { isLoading, isError, data: users } = useQuery<User[], Error>({queryKey: ['users', eventId], queryFn: async () => {
        const response = await axiosClient.get(`registered-users/events/${eventId}`,{
            withCredentials: true,
        });
        return response.data;
    }
    });
    if (isLoading){
        return <div>Loading...</div>
    }
    if (isError){
        return <div>Error has occured!</div>
    }
  return (

    <section className="max-w-[1024px] px-5 py-10 mx-auto flex flex-col items-center gap-5 justify-start">
        <h2 className="text-primary text-xl font-bold">Users registered</h2>
        {users?.length === 0 ? <p>No user registered yet</p> :users?.map(user => (<UserCard key={user._id} email={user.email} fullname={user.fullName} time={(new Date(user.createdAt)).toDateString()}/>))}
    </section>
  )
}

export default UserList