import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FaCloudDownloadAlt } from "react-icons/fa";
function AppDetails() {
    const location= useLocation()
    const {state}= location;
    const applicant= state?.applicant
  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>Applicant Details</h1>
      <section className='w-3/4 mx-auto shadow-lg p-4'>
        <img src={applicant.user?.profile} alt={applicant.user.username} className='w-28 h-28 rounded-full' />
        <div className='my-4 shadow-md p-4'>
           <h1 className='text-xl'>Name: <span className="font-bold">{applicant.user?.username}</span></h1>
      <h1 className='text-xl'>Email: <span className='font-bold'>{applicant.user?.email}</span></h1>
      <h1 className='text-xl'>Role: <span className='font-bold'>{applicant.user?.skill}</span></h1>  
        </div>
     
      <div className='border border-gray-600 p-4'>
      <h1 className='text-center font-bold text-xl'>Cover Letter</h1>
        <p>
            {applicant.letter}
        </p>
      </div>
      <button 

      className="flex px-8 py-3 my-4 text-white items-center bg-gradient-to-r from-blue-600 to-teal-500 rounded-md text-center">
      <a href={applicant.resume} className='flex items-center'>
         <FaCloudDownloadAlt size="28px" />  
      Download Resume
      </a>
     
       
       
      </button>
      </section>
      
    </div>
  )
}

export default AppDetails
