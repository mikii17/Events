import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main className='bg-primary min-h-screen text-primary flex flex-col gap-5 items-center justify-center'>
      <h1 className='text-lg'>
        Oops! Sorry, an unexpected error has occurred.
      </h1>
      <Link to={'/'}>
        <button className='bg-accent p-2 rounded-lg text-white'>
          Go back to home
        </button>
      </Link>
    </main>
  );
};

export default Error;
