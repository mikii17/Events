import Events from '../components/Events';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <main>
      <section className='h-screen bg-primary relative px-2'>
        <Hero />
      </section>

      <div className='min-h-[100vh] py-10 px-4' id='events'>
        <div className='max-w-[1024px] mx-auto flex flex-col items-center'>
          <div className='self-end'>
            <button className='bg-accent p-2 rounded-lg'>Add Event</button>
          </div>
          <Events />
        </div>
      </div>
    </main>
  );
};

export default Home;
