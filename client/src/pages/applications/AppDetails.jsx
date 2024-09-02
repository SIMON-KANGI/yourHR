import React from 'react'
import { useLocation } from 'react-router-dom'
function AppDetails() {
    const location= useLocation()
    const {state}= location;
    const applicant= state?.applicant
  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>Applicant Details</h1>
      <section className='w-3/4 mx-auto shadow-lg p-4'>
        <img src={applicant.user?.profile} alt={applicant.user.username} className='w-28 h-28 rounded-full' />
      <h1 className='font-bold text-xl'>Name: {applicant.user?.username}</h1>
      <h1 className='font-bold text-xl'>Email: {applicant.user?.email}</h1>
      <h1 className='font-bold text-xl'>Role: {applicant.user?.role}</h1>
      </section>
      
    </div>
  )
}

export default AppDetails
