import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='max-w-[1024px] h-full flex flex-col gap-12 items-center justify-center mx-auto px-2 relative'>
      <Link to={'/'}>
        <div className='absolute right-5 top-5'>
          <img src='/logo.svg' alt='Logo' width={'50px'} height={'50px'} />
        </div>
      </Link>
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
        />
        <button className='bg-accent p-2 rounded-lg flex-[1]'>Search</button>
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
