const EventCardSkeleton = () => {
  return (
    <div className="loading h-[502px] max-w-[21.875rem] rounded-lg overflow-hidden bg-primary">
      <div className="h-[50%] image"></div>

      <div className="h-[50%] w-full p-3 transition-all duration-500">
        <h4 className="mb-10 mt-10"></h4>
        <div className="description"></div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
