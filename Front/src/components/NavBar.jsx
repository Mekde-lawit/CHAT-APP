import { Link } from 'react-router-dom';
import {useAuthStore} from '../store/useAuthStore';
import { LogOut } from 'lucide-react';
const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  return (
   <header className='bg-base-100 border-b backdrop-blur-lg bg-base-100/80'>

<div
className='container mx-auto flex justify-between items-center py-4'>
  <div className='flex items-center space-x-4'>
    <Link to="/"> <h1 className='text-xl font-bold'>Chat App</h1></Link> 
  </div>
<div className='flex items-center gap-2'>
  <Link to="/settings">
    <button className='btn btn-secondary'>Settings</button>
  </Link>
  {
    authUser && (
     <> 
     <Link to="/profile">
       <button className='btn btn-primary'>Profile</button>
     </Link>
      <button className='btn btn-error' onClick={logout}>
       <LogOut />
        Logout</button>
     </>
    )
  }

</div>



</div>


   </header>
  )
}

export default NavBar