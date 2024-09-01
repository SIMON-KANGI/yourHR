import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
function ApplicationList({ applications }) {
  const [applicantDetails, setApplicantDetails] = useState([]);

 
const fetchUsers=async()=>{
    const res=await axios.get('https://yourhr-2des.onrender.com/user/users')
    return res.data
}
const { data, isLoading,error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
const applicant=applications.map(applicant=>{
    return applicant
})
const filterApplicants=data.filter(user=>user.id===applicant.user_id)

  return (
    <div>
      {applications.length > 0 && (
        <div>
          <h1 className='text-xl font-bold'>Applications</h1>
          <ul>
            {filterApplicants.map((applicant, index) => (
              <li key={index} className='my-2'>
                <div>Name: {applicant.username}</div>
                <div>Email: {applicant.email}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ApplicationList;
