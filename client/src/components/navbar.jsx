import React from 'react'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/UseAuth'
import { Button, Menu, MenuButton,MenuGroup,MenuItem, MenuList } from '@chakra-ui/react'
import LogOut from './logOut'
import { IoPersonCircle } from "react-icons/io5";
import { VscGitStashApply } from "react-icons/vsc";
function NavBar() {
  const isAuthenticated=useAuth(['employee', 'employer'])
  const user=useSelector(selectCurrentUser)
  return (
    <header className='flex items-center justify-around p-8 shadow-md sticky z-10'>

    <h1 className='text-3xl font-bold text-green-700 italic'>your<span className='text-rose-700'>HR</span></h1>
      <div>
<nav>
    <ul className='lg:flex block items-center'>
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
            <MenuButton  variant='outline'>
<img src={user.profile} alt={user.username} className='w-12 h-12 rounded-full' />
            </MenuButton>
            <MenuList>
            <MenuGroup>
               <MenuItem className='flex justify-around'>
              <img src={user.profile} alt={user.username} className='w-12 h-12 rounded-full'/>
              <div className='block mx-6'>
                <h1 className='text-xl'>{user.username}</h1>
                <p className='text-sm'>{user.role}</p>
              </div>
            </MenuItem>
            </MenuGroup>
           
            <MenuGroup>
                <MenuItem as={Link} to={`/profile/${user.id}`} className="flex items-center my-4">
              <IoPersonCircle size="32px"/>
              <h1 className='mx-4'>Your Profile</h1>
              </MenuItem>
              <MenuItem as={Link} to={`/applications`} className='flex items-center'>
              <VscGitStashApply size="32px"/>
              <h1 className="mx-4">My Applications</h1></MenuItem>
            </MenuGroup>
            
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
