import { Link } from 'react-router-dom';

const Event = () => {
  return (
    <main className='min-h-screen bg-primary flex items-center justify-center  px-5 py-10'>
      <div className='max-w-[1024px] mx-auto flex flex-col md:flex-row items-center gap-10'>
        <section className='flex-[1]'>
          <div className=' bg-lightGreen flex justify-center items-center p-16 rounded-lg'>
            <img
              src='/event.svg'
              alt='Event'
              width={'170px'}
              height={'170px'}
            />
          </div>
        </section>

        <section className='flex-[3] flex flex-col gap-16'>
          <div className='flex items-center justify-between'>
            <h1 className='text-primary text-xl'>Title Title</h1>
            <div className='flex gap-3'>
              <button className='underline'>Edit</button>
              <button className='underline'>Delete</button>
            </div>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel
              eos sunt ad odit impedit vero doloremque dolores ab officia. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nemo vel eos
              sunt ad odit impedit vero doloremque dolores ab officia. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nemo vel eos
              sunt ad odit impedit vero doloremque dolores ab officia. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Nemo vel eos
              sunt ad odit impedit vero doloremque dolores ab officia.
            </p>
          </div>

          <div className='flex items-center justify-between'>
            <p>Addis Ababa, Ethiopia</p>
            <p>21-21-2016</p>
          </div>

          <div className='flex flex-col gap-2 justify-center items-center'>
            <button className='bg-accent p-2 rounded-lg'>RSVP</button>
            <Link to={''}>Check out the link</Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Event;
