import React from 'react'

function ApplicationList({applications}) {
  return (
    <div>
      {applications.length > 0 &&(
        <div>
        <h1 className='text-xl font-bold'>Applications</h1>
        <ul>
          {applications.map((application, index) => (
            <li key={index} className='my-2'>
              <div>Name: {application.date}</div>
              <div>Email: {application.status}</div>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  )
}

export default ApplicationList
