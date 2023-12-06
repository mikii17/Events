import { Link } from 'react-router-dom';

type EventCardProps = {
  id: number;
  title: string;
  description: string;
  date: string;
};
const EventCard = ({ id, title, description, date }: EventCardProps) => {
  return (
    <Link to={`/event/${id}`}>
      <div className='h-[502px] max-w-[21.875rem] rounded-lg overflow-hidden group neon transition-all duration-200'>
        <div className='h-[50%] bg-lightGreen flex items-center justify-center'>
          <img src='/event.svg' alt='Event' width={'70%'} height={'150px'} />
        </div>

        <div className='h-[50%] w-full bg-lightBlue p-3 group-hover:p-0 transition-all duration-500'>
          <div className='bg-secondary mt-[-50px] rounded-lg p-3 h-[calc(100%+62px)] flex flex-col gap-10 py-5'>
            <h3 className='text-primary text-xl'>{title}</h3>
            <p className='text-secondary text-sm line-3'>{description}</p>

            <span className='text-end'>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
