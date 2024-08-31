import React from 'react'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/UseAuth'
import { Button, Menu, MenuButton,MenuItem, MenuList } from '@chakra-ui/react'
import LogOut from './logOut'
import { IoPersonCircle } from "react-icons/io5";
function NavBar() {
  const isAuthenticated=useAuth(['employee', 'employer'])
  const user=useSelector(selectCurrentUser)
  return (
    <header className='flex items-center justify-around p-8 shadow-md sticky z-10'>

    <h1 className='text-3xl font-bold text-green-700 italic'>your<span className='text-rose-700'>HR</span></h1>
      <div>
<nav>
    <ul className='lg:flex block'>
        <li className='mx-4 hover:font-bold'><Link to='/'>Home</Link></li>
       <li className='mx-4 hover:font-bold'>
       <Link to="/jobs">
            Jobs
       </Link></li>
       {!isAuthenticated &&(
        <div className='flex'>
           <li className='mx-4 hover:font-bold'><Link to="/login">Login</Link></li>
       <li className='mx-4 hover:font-bold'><Link to="/signup">Register</Link></li>
      
        </div>
        
       )}
      
      {isAuthenticated &&(
        <div>
          <Menu>
            <MenuButton as={Button}>
<img src={user.profile} alt={user.username} className='w-12 h-12 rounded-full' />
            </MenuButton>
            <MenuList>
            <MenuItem className='flex'>
              <img src={user.profile} alt={user.username} className='w-12 h-12 rounded-full'/>
              <div className='block'>
                <h1 className='text-xl'>{user.username}</h1>
                <p className='text-sm'>{user.role}</p>
              </div>
            </MenuItem>
            <hr/>
              <MenuItem as={Link} to={`/profile/${user.id}`} className="flex">
              <IoPersonCircle/>
              <h1>Your Profile</h1>
              </MenuItem>
              <MenuItem as={Link} to={`/applications`}>My Applications</MenuItem>
              <MenuItem>
                <LogOut/>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
  
    </ul>
</nav>
      </div>
    </header>
  )
}

export default NavBar
