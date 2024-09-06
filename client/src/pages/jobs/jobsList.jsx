import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardBody, CardHeader, Progress } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import useDebounce from '../../../hooks/UseDebounce';
import FilterJobs from './filterJobs';

function JobList() {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 1000);
  const [selectedCategory, setCategory] = useState('');

  // Fetch jobs from the API
  const fetchJobs = async () => {
    const response = await axios.get('https://yourhr-2des.onrender.com/job/jobs');
    return response.data;
  };

  // Use React Query to handle fetching
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  // Handle category change
  const handleChangeCategory = (id) => {
    setCategory(id);
  };

  // Handle input change
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  // Handle loading and error states
  if (isLoading) return <Progress isIndeterminate size="xs" />;
  if (error) return <div>Error: {error.message}</div>;

  // Filter jobs based on debounced input and selected category
  const filteredJobs = data.filter((job) => {
    const byInput = job.title.toLowerCase().includes(debouncedInput.toLowerCase());
    const filterCategory = !selectedCategory || job.category_id === selectedCategory;
    return byInput && filterCategory;
  });

  return (
    <div className='w-3/4 mx-auto'>
      <FilterJobs handleFilterCategory={handleChangeCategory} input={input} handleInput={handleInput} />

      {filteredJobs?.map((job) => (
        <Card key={job.id} mb={4}>
          <CardBody className='hover:bg-stone-200 hover:text-emerald-400'>
            <CardHeader className='text-2xl font-medium'>
              <Link className='hover:border-b-2 border-gray-600' to={`/jobs/${job.id}`} state={{ job }}>
                {job.title}
              </Link>
            </CardHeader>
            <p className='text-gray-700'>{job.details.slice(0, 300)}...</p>

            <div className='flex flex-wrap gap-2'>
              {job.skills?.length > 0 &&
                job.skills.map((skill, index) => (
                  <div key={index} className='bg-gray-200 p-2 my-4 text-gray-800 rounded-full'>
                    {skill}
                  </div>
                ))}
            </div>

            <span className='rounded-full font-bold text-emerald-800'>
              {job.applications.length} applicants
            </span>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

export default JobList;
