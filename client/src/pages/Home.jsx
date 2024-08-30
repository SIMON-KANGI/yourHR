import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/UseAuth'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
function Home() {
    const toast = useToast();
    const navigate= useNavigate()
    const [categories, setCategories]= useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://yourhr-2des.onrender.com/categories');
                setCategories(res.data);
            } catch (error) {
                toast({
                    title: 'Error fetching categories',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                });
            }
        };
        fetchCategories();
    }, [toast]);
    const isAuthenticated=useAuth(['employer', 'employee'])
  return (
    <div>
    <ul className='flex text-center mx-12 my-4'>
        {categories.map(category => (
            <li key={category.id} className='mx-2 hover:text-emerald-700 hover:border-b'>
            <Link>
                {category.name}
            </Link></li>
        ))}
  
    </ul>
      <section className='w-3/4 mx-auto flex justify-between py-16'>
        <div>
            <h1 className='text-6xl font-bold my-4'>Welcome to yourHr <hr/> Job Portal</h1>
            <p className='text-xl font-medium'>Forget the old rules. You can have the best people.<br/>Right now. Right here.</p>
        {isAuthenticated &&(
            <button onClick={()=>navigate('/jobs')} className="btn rounded-lg py-3 my-8 text-white w-40">Explore Jobs</button> 
        )}
        {!isAuthenticated && (
        <button onClick={()=>navigate('/signup')} className="btn rounded-lg py-3 my-8 text-white w-40">Get Started</button>   
        )}
            
               

           
        </div>
        <div>
            <img src="/image1.jpg" alt="talent" className='rounded-full' />
        </div>
      </section>
    </div>
  )
}

export default Home
