import React, { useState, useEffect } from 'react'
import useAuth from '../../hooks/UseAuth'
import axios from 'axios';
import { Card, CardBody, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { TfiWrite } from "react-icons/tfi";
import { TiPin } from "react-icons/ti";
import { GiAlliedStar } from "react-icons/gi";
import { MdOutlineStarPurple500 } from "react-icons/md";
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
            <img src="/image2.jpg" alt="talent" className='rounded-full h-96' />
        </div>
      </section>
      <section className='w-3/4 h-fit mx-auto flex items-center py-16'>
      <div>
        <img src="/image1.jpg" alt="talent" className='rounded-md h-96' />
      </div>
        <div className='ml-4'>
            <h1 className="text-4xl font-bold">Up your work game, it's easy</h1>
            <div className='my-4'>
                <h2 className='text-xl font-semibold flex items-center'>
                <TfiWrite/>
                <span className='p-2'>No cost to Join</span></h2>
                <p className='text-sm'>Register and browse talent profiles,explore projects and even book a consultation</p>
            </div>
            <div>
                <h2 className='text-xl font-semibold flex items-center'>
                <TiPin/>
                <span className='p-2'>Post a Job and hire top talent</span></h2>
                <p className="text-sm">Finding talent doesn’t have to be a chore. Post a job or we can search for you!</p>
            </div>
            <div className='my-4'>
                <h2 className='text-xl font-semibold flex items-center'>
                <GiAlliedStar/>
                <span className='p-2'>Work with the best—without breaking the bank</span></h2>
                <p className='text-sm'>Upwork makes it affordable to up your work and take advantage of low transaction rates.</p>
            </div>
            <div>
              <button className="py-2 w-fit px-4 bg-green-600 text-white font-semibold rounded-md">Sign up for free</button>
              <button className="py-2 mx-4 border-2 w-fit px-4 border-green-700 text-green-700 font-medium rounded-lg">Learn how to hire</button>
            </div>
        </div>
      </section>
      <section className='w-3/4 h-fit mx-auto items-center py-16'>
      <div className='flex-col'>
        <h1 className='text-5xl font-semibold'>Browse talent by category</h1>
        <p>Looking for work? <Link className='text-green-700'>Browse jobs</Link></p>
      </div>
        <div className='grid grid-cols-4'>
            {categories.map(category=>{
                return(
                    <Card className='my-4 mx-2'>
                        <CardBody className='bg-gray-100 py-8'>
                            <h1 className='text-2xl'>{category.name}</h1>
                            <div className='flex justify-between my-4'>
                                <h2 className='flex items-center'>
                                <MdOutlineStarPurple500 color="green"/>
                               <span>4.85/5</span> </h2>
                                <h2>1853 skills</h2>
                            </div>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
      </section>
    </div>
  )
}

export default Home
