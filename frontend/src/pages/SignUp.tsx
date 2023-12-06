const Register = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-secondary'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-primary px-6 py-8 rounded shadow-md w-full flex flex-col gap-10'>
          <h1 className='text-2xl text-center text-primary'>Register</h1>
          <div>
            <input
              type='text'
              className='block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none'
              name='fullname'
              placeholder='Full Name'
            />

            <input
              type='text'
              className='block border border-x-0 border-t-0 border-b-2 border-grey-light w-full py-3 mb-4 bg-transparent focus:outline-none'
              name='email'
              placeholder='Email'
            />
          </div>

          <button className='bg-accent p-2 rounded-lg'>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
