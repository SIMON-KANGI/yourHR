import React from 'react'
import { useLocation } from 'react-router-dom'
import ApplyJob from '../applications/ApplyJob';
import useAuth from '../../../hooks/UseAuth';
function JobDetails() {
  const isEmployee= useAuth(['employee'])
    const location= useLocation()
    const {state}= location;
    const job= state?.job
  return (
    <div>
   
   
      <section className='w-3/4 mx-auto p-8 border'>
        <h1 className='text-3xl font-semibold'>{job?.title}</h1>
        <p className='text-md'>{job?.details}</p>
        <hr className='my-4'/>
        <h1 className='text-xl font-bold my-4'>Skills & Expertise</h1>
        <div className='flex flex-wrap gap-2 my-4'>
           {job.skills.map((skill, index)=>{
            return <div key={index} className='bg-gray-200 p-2 text-gray-800 rounded-full'>{skill}</div>
        })}  
        </div>
       
      </section> 
      {isEmployee &&(
           <div className='w-3/4 mx-auto my-4 p-8 border'>
     <ApplyJob id={job.id}/>
    </div>
      )}
   
    </div>
  )
}

export default JobDetails
