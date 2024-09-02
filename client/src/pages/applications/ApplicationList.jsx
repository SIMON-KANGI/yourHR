import { Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
function ApplicationList({ applications }) {
 const navigate=useNavigate()
  return (
    <div>
      {applications.length > 0 && (
        <div>
          <h1 className='text-xl font-bold text-center mb-6'>Applications</h1>
          <table className='min-w-full table-auto'>
<thead>
    <tr>
      <th className='px-4 py-2'>Name</th>
      <th className='px-4 py-2'>Email</th>
      <th className='px-4 py-2'>Status</th>
      <th  className='px-4 py-2'>Actions</th>
    </tr>
  
</thead>
            {applications.map((applicant, index) => (
              <tr key={index} className=' border-b items-center'>
                <td  className='px-4 py-2 text-center'>{applicant.user.username}</td>
                <td  className='px-4 py-2 text-center'>{applicant.user.email}</td>
                <td  className='px-4 py-2 text-center'>
                <button className='bg-rose-600 text-gray-200 py-2 px-6 rounded-lg'>
                     {applicant.status}
                </button>
             
                </td>
                <td className='px-4 py-2 text-center'>  
                 <Tooltip hasArrow label="View more">
                  <button
                   onClick={()=>navigate(`/jobs/applicants/${applicant.user.username}`)}
                   className='bg-transparent  hover:text-green-600 py-2 px-6 rounded-lg'>
                <FaEye size="28px"/>
                </button>
                   </Tooltip>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default ApplicationList;
