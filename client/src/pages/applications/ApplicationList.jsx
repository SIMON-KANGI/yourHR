import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApplicationList({ applications }) {
  const [applicantDetails, setApplicantDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicants = async (userIds) => {
    try {
      const res = await axios.get(`https://yourhr-2des.onrender.com/user/users`, {
        params: { ids: userIds.join(',') } // Assuming your backend can handle this
      });
      setApplicantDetails(res.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching applicant details');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applications.length > 0) {
      const userIds = applications.map(app => app.user_id);
      fetchApplicants(userIds);
    } else {
      setApplicantDetails([]);
      setLoading(false);
    }
  }, [applications]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {applications.length > 0 && (
        <div>
          <h1 className='text-xl font-bold'>Applications</h1>
          <ul>
            {applicantDetails.map((applicant, index) => (
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
