import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <main className='bg-primary min-h-screen text-primary flex flex-col gap-16 items-center justify-center'>
        <h1 className='text-7xl font-bold text-primary' style={{fontSize: '4.5rem', lineHeight: '1rem', fontWeight: '700'}}>
           404
        </h1>
        <p className="px-5 text-center text-white md:text-lg leading-8 sm:max-w-xl lg:max-w-3xl ">
        Either there’s a tear in the matrix or the page you’re looking for no
        longer exists
      </p>
        <Link to={'/'}>
            <button className='bg-accent p-2 rounded-lg text-white'>
            Go back to home
            </button>
        </Link>
    </main>
  )
}

export default NotFound