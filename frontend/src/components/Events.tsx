import EventCard from './EventCard';

const Events = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-16'>
      <EventCard
        id={1}
        title={'Title Title'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animilabore corrupti recusandae eum iure beatae alias quaerat dicta remullam.'
        }
        date={'20-21-2016'}
      />
      <EventCard
        id={2}
        title={'Title Title'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animilabore corrupti recusandae eum iure beatae alias quaerat dicta remullam.'
        }
        date={'20-21-2016'}
      />
      <EventCard
        id={3}
        title={'Title Title'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animilabore corrupti recusandae eum iure beatae alias quaerat dicta remullam.'
        }
        date={'20-21-2016'}
      />
      <EventCard
        id={4}
        title={'Title Title'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animilabore corrupti recusandae eum iure beatae alias quaerat dicta remullam.'
        }
        date={'20-21-2016'}
      />
      <EventCard
        id={5}
        title={'Title Title'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animilabore corrupti recusandae eum iure beatae alias quaerat dicta remullam.'
        }
        date={'20-21-2016'}
      />
      <EventCard
        id={6}
        title={'Title Title'}
        description={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animilabore corrupti recusandae eum iure beatae alias quaerat dicta remullam.'
        }
        date={'20-21-2016'}
      />
    </div>
  );
};

export default Events;
