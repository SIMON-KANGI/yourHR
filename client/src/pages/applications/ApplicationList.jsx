import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import PropTypes from 'prop-types';

// Single Application Row Component
function ApplicationRow({ applicant }) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/jobs/applicants/${applicant.user.username}`, { state: { applicant } });
  };

  return (
    <tr className='border-b items-center'>
      <td className='px-4 py-2 text-center'>{applicant.user.username}</td>
      <td className='px-4 py-2 text-center'>{applicant.user.email}</td>
      <td className='px-4 py-2 text-center'>
        <button className='bg-rose-600 text-gray-200 py-2 px-6 rounded-lg'>
          {applicant.status}
        </button>
      </td>
      <td className='px-4 py-2 text-center'>
        <Tooltip hasArrow label="View more">
          <button
            onClick={handleViewClick}
            className='bg-transparent hover:text-green-600 py-2 px-6 rounded-lg'
            aria-label={`View details for ${applicant.user.username}`}
          >
            <FaEye size="28px" />
          </button>
        </Tooltip>
      </td>
    </tr>
  );
}

ApplicationRow.propTypes = {
  applicant: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

// Main Application List Component
function ApplicationList({ applications = [] }) {
  if (applications.length === 0) {
    return <p className='text-center'>No applications found.</p>;
  }

  return (
    <div>
      <h1 className='text-xl font-bold text-center mb-6'>Applications</h1>
      <table className='min-w-full table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Status</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((applicant, index) => (
            <ApplicationRow key={index} applicant={applicant} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ApplicationList.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ApplicationList;
