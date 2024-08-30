import { FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Progress } from '@chakra-ui/react';
function ApplyJob({ id }) {
    const toast = useToast();
    const user = useSelector(selectCurrentUser);
    const [file, setFile] = useState(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        job_id: id,
        letter: "",
        status: "pending",
        user_id: user?.id
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Create a new FormData object
      const form = new FormData();
      form.append('user_id', formData.user_id);
      form.append('job_id', formData.job_id);
      form.append('status', formData.status);
      form.append('letter', formData.letter);
      form.append('file', file); // Attach the selected file
  
      try {
          setSubmitting(true);
          const res = await axios.post('http://127.0.0.1:5555/apply/applications', form, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
  
          if (res.status === 200 || res.status === 201) {
              toast({
                  title: 'Application submitted successfully',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
              });
  
              setFormData({
                  job_id: id,
                  letter: "",
                  status: "pending",
                  user_id: user?.id
              });
              setFile(null);
          } else {
              toast({
                  title: 'Error submitting application',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
              });
          }
      } catch (error) {
          console.error('Error applying for job:', error);
          toast({
              title: 'Network error while submitting application',
              status: 'error',
              duration: 5000,
              isClosable: true,
          });
      } finally {
          setSubmitting(false);
      }
  };
  

    return (
        <div>
        {isSubmitting && <Progress size="xs" isIndeterminate className="my-4" />}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label className='font-bold text-2xl'>Cover Letter </label>
                    <span className='text-md'>(Max 1000)</span>
                    <textarea
                        onChange={handleChange}
                        name='letter'
                        value={formData.letter}
                        className="bg-transparent rounded-md border shadow-md p-4"
                        rows='10'
                        cols='30'
                        placeholder='Write your cover letter here'
                    />
                </div>
                <div>
                    <h1 className='font-bold text-xl'>Attachments</h1>
                    <FormControl className='mb-4'>
                        <FormLabel className="font-bold text-lime-800">Upload Resume</FormLabel>
                        <Input
                            type='file'
                            accept='application/pdf'
                            onChange={handleFileChange}
                            name="file"
                            className='w-full'
                           
                            required
                        />
                        {!file && (
                            <p className='text-red-500'>Upload a PDF</p>
                        )}
                        {file && !file.type.endsWith('/pdf') && (
                            <p className='text-red-500'>Please upload a valid PDF file</p>
                        )}
                    </FormControl>
                </div>
                <button
                    type="submit"
                    className="float-center py-3 px-12 bg-green-700 text-stone-200 rounded-lg"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Apply now'}
                </button>
            </form>
            
        </div>
    );
}

export default ApplyJob;
