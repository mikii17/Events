import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const UserDropDown = () => {
    const [open, setOpen] = useState(false)
    const toggleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{ 
        e.stopPropagation()
        setOpen(prevOpen => !prevOpen)
    }
    useEffect(() => {
        const close = () => setOpen(false)
        window.addEventListener('click', close)
        return () => window.removeEventListener('click', close)
    }, [])
  return (
    <div className='absolute right-5 top-5'>
      <button className='relative' onClick={toggleOpen}>
        <img src='/logo.svg' alt='Logo' width={'50px'} height={'50px'} className='rounded-[50%]' />
        {open && <div className='absolute top-[105%] right-0 flex flex-col w-fit bg-secondary'>
          <Link to="/change-password" className='px-5 py-3 border rounded-tr rounded-tl'>Change&nbsp;Password</Link>
          <Link to="create-admin" className='px-5 py-3 border rounded-br rounded-bl'>Create Admin</Link>
        </div>}
      </button>
    </div>
  )
}

export default UserDropDown