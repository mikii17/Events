const UserCard = ({
  fullname,
  email,
  time,
}: {
  fullname: string;
  email: string;
  time: string;
}) => {
  return (
    <div className="w-full flex items-center justify-between px-7 py-4 bg-secondary gap-7 text-white rounded-lg">
      <div className="">{fullname}</div>
      <div>{email}</div>
      <div className="">{time}</div>
    </div>
  );
};

export default UserCard;
