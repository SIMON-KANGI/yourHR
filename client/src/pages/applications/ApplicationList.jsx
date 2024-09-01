import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function ApplicationList({ applications }) {
  const [applicantDetails, setApplicantDetails] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('https://yourhr-2des.onrender.com/user/users');
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (data) {
      // Filter users based on the application.user_id
      const filteredApplicants = data.filter(user =>
        applications.some(app => app.user_id === user.id)
      );
      setApplicantDetails(filteredApplicants);
    }
  }, [data, applications]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {applications.length > 0 && (
        <div>
          <h1 className='text-xl font-bold'>Applications</h1>
          <table>
<thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  
</thead>
            {applicantDetails.map((applicant, index) => (
              <tr key={index} className='my-2'>
                <td>{applicant.username}</td>
                <td>{applicant.email}</td>
                
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default ApplicationList;
