import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/api';
import { setCredentials } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useToast, Progress } from '@chakra-ui/react';
import axios from 'axios'; // Import axios

function Login() {
  const [visible, setVisible] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setSubmitting]=useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      setSubmitting(true)
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
  
      const { access_token,refresh_token,user } = response; // Adjust this to match your API's response structure
  
      if (access_token,user) {
        setSubmitting(false)
        // const res= await axios.get('https://yourhr-2des.onrender.com/auth/token',{
        //   headers: {
        //     Authorization: `Bearer ${access_token}`,
        //   },
        // })
        // const [{token}] =res.data
        dispatch(setCredentials({ isAuthenticated: true, user:user, token:access_token, refresh:refresh_token })); // Dispatch to authSlice
        toast({
          title: 'Logged in successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        navigate('/jobs', { replace: true }); // Redirect to home or desired path
      } else {
        toast({
          title: 'Error Logging in',
          description: 'No access token or user data received',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setSubmitting(false)
      console.error("Login error:", error); // Log the error
      toast({
        title: 'Error Logging in',
        description: error.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  

  return (
    <div>
      {isSubmitting && <Progress size='xs' isIndeterminate colorScheme='green' />}
      <div>
        <h1 className='text-center mt-5 text-4xl font-bold'>Welcome Back</h1>
      </div>
      <div className='lg:w-1/2 lg:mx-auto justify-center'>
        <div className='lg:w-1/2 lg:mx-auto border px-12 py-16 shadow-md rounded-md'>
          <h1 className='text-center text-2xl font-bold'>Login into yourHr</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label className='font-bold' htmlFor="email">Email:</label>
              <input 
                type="email" 
                id="email" 
                onChange={handleChange} 
                placeholder='Enter your email' 
                name="email" 
                className='p-2 rounded-md bg-transparent border shadow-sm border-gray-300' 
                required 
              />
            </div>
            <div className='flex flex-col my-4'>
              <label className='font-bold' htmlFor="password">Password:</label>
              <input 
                type={visible ? 'text' : 'password'} // Toggle visibility
                onChange={handleChange} 
                placeholder='Enter your password' 
                id="password" 
                name="password" 
                className='p-2 bg-transparent rounded-md border shadow-sm border-gray-300' 
                required 
              />
              <span>
                <input 
                  type="checkbox" 
                  id="show-password" 
                  onChange={() => setVisible(!visible)}
                />
                <label htmlFor="show-password">Show password</label>
              </span>
            </div>
            <button 
              type="submit" 
              className='bg-black text-white w-full my-3 py-3 rounded-full'>
              Login
            </button>
          </form>
          <div className='flex flex-col my-4'>
            <h3 className='text-center'>
              --Don't have a yourHr account?--
            </h3>
            <button 
            onClick={()=>navigate('/signup')}
              className='rounded-full my-3 py-3 bg-transparent border border-green-500'>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
