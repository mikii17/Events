import { Link } from 'react-router-dom';

type EventCardProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
};
const EventCard = ({ id, title, description, date, image }: EventCardProps) => {
  return (
    <Link to={`/events/${id}`}>
      <div className='h-[502px] max-w-[21.875rem] rounded-lg overflow-hidden group neon transition-all duration-200'>
        <div className='h-[50%] bg-lightGreen flex items-center justify-center overflow-hidden'>
          <img src={image? `http://localhost:3000/${image}` : '/event.svg'} alt='Event' className='object-cover object-top h-full w-full block' />
        </div>

        <div className='h-[50%] w-full bg-lightBlue p-3 group-hover:p-0 transition-all duration-500'>
          <div className='bg-secondary relative z-10 mt-[-50px] rounded-lg p-3 h-[calc(100%+62px)] flex flex-col gap-10 py-5'>
            <h3 className='text-primary text-xl'>{title}</h3>
            <p className='text-accent text-sm line-3'>{description}</p>

            <span className='text-end text-secondary'>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
