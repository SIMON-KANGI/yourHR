import { Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerFooter,DrawerHeader, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { RiCloseLargeFill, RiSearchEyeFill } from "react-icons/ri";
function SideNav() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
    <button onClick={onOpen}>
<IoMenu size='32px'/>
    </button>
      <Drawer isOpen={isOpen} onClose={onClose} placement='left' size='full'>
        <DrawerContent>
       
          <DrawerHeader className='flex items-center lg:justify-around justify-between lg:p-8 p-2 shadow-md sticky z-10'>
          <div className='flex'>
           <button>
    <RiCloseLargeFill size='32px' onClick={onClose}/>
    </button>
          <h1 className='text-3xl mx-2 font-bold text-green-700 italic'>your<span className='text-rose-700'>HR</span></h1> 
          </div>
          <RiSearchEyeFill size="32px"/>
          </DrawerHeader> 

          <DrawerBody className='shadow-lg'>
         <ul className='block'>

              <div className='my-10'><Link to='/' className='text-md'>Home</Link></div>
            <div className='my-10'><Link to='/about' className='text-md'>About</Link></div>
            <div className='my-10'><Link to='/' className='text-md'>Home</Link></div>
            <div className='my-10'><Link to='/about' className='text-md'>About</Link></div>
            <div className='my-10'><Link to='/login' className='text-md'>Login</Link></div>
         </ul>
          
          </DrawerBody>
          <DrawerFooter className='justify-center shadow-lg'>
            <button className='text-md text-white bg-green-700 w-full py-3 rounded-lg'>
              <Link to="/signup">Sign up</Link>
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SideNav
