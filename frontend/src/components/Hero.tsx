import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserDropDown from './UserDropDown';
import { useState } from 'react';

const Hero = () => {
  const auth = useAuth();
  const [searchParams, _] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
 


  return (
    <div className='max-w-[1024px] h-full flex flex-col gap-12 items-center justify-center mx-auto px-2 relative'>
      {auth != null ?<UserDropDown /> : <Link to="/login" className='underline text-lg absolute right-5 top-5'>Login</Link>}
      <img src='/event.svg' alt='Event' width={'150px'} height={'150px'} />

      <div className='md:w-[80%] flex flex-col gap-7'>
        <h1 className='text-xl sm:text-3xl md:text-4xl leading-loose text-center font-semibold'>
          A place where you can find Events across Ethiopia
        </h1>
        <h2 className='text-md sm:text-lg leading-loose text-center font-medium'>
          Elevate Your Events, Simplify Your Registration !
        </h2>
      </div>
      <div className='flex gap-2 w-[80%] '>
        <input
          type='text'
          className='p-3 rounded-lg text-black placeholder:text-black bg-green flex-[4]'
          placeholder='Event...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Link to={search ? `?search=${search}#events` : "#events"} className='bg-accent p-2 rounded-lg flex-[1] flex justify-center items-center'>Search</Link>
      </div>
      <a
        href='#events'
        className='absolute bottom-5 left-1/2 translate-x-[-50%] up-down'
        title='Scroll-down'
      >
        <img src='/arrow.svg' alt='down-arrow' width={'25px'} height={'25px'} />
      </a>
    </div>
  );
};

export default Hero;
