import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useToast, Progress } from '@chakra-ui/react';
import * as yup from 'yup';
import { FaImage } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [file, setFile] = useState(null);
    const toast = useToast();
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate= useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://yourhr-2des.onrender.com/categories');
                setCategories(res.data);
            } catch (error) {
                toast({
                    title: 'Error fetching categories',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };
        fetchCategories();
    }, [toast]);

    const initialValues = {
        name: '',
        email: '',
        role: '',
        company: '',
        skill: '',
        password: '',
        confirmPassword: '',
        profile: 'image',
    };

    const formSchema = yup.object().shape({
        name: yup.string().required('Must enter a name').max(50),
        email: yup.string().email('Invalid email').required('Must enter email'),
        role: yup.string().required('Must provide a role'),
        company: yup.string().when('role', {
            is: (role) => role === 'employer',
            then: (schema) => schema.required('Company name is required for employers'),
            otherwise: (schema) => schema.notRequired(),
        }),
        skill: yup.string().required('Must provide a skill'),
        password: yup.string().required('Must enter a password').min(8),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Must confirm password'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsSubmitting(true); // Set the submitting state to true
        if (!file) {
            toast({
                title: 'Profile image is required',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setSubmitting(false);
            setIsSubmitting(false); // Set the submitting state to false
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('role', values.role);
            formData.append('company', values.company);
            formData.append('skill', values.skill);
            formData.append('password', values.password);
            formData.append('profile', 'image');
            formData.append('file', file);

            const response = await axios.post('https://yourhr-2des.onrender.com/user/users', formData);

            if (response.status === 201) {
                toast({
                    title: 'Registration Successful',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/login')
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            toast({
                title: 'Error Registering User',
                description: error.response?.data?.error || 'Something went wrong',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setSubmitting(false);
            setIsSubmitting(false); // Set the submitting state to false
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    return (
      <section> 
      {isSubmitting && <Progress size='xs' isIndeterminate colorScheme='green' />}
 <div className='w-screen flex overflow-hidden max-h-screen'>
            {/* Progress bar */}
           
            <section className='w-1/2 shadow-lg'>
                <div className='w-1/2 mx-auto items-center py-32'>
                    <img src="/image1.avif" className='w-full h-full' alt="Decorative" />
                </div>
            </section>
            <section className='w-1/2 p-4'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form className='w-full'>
                            <h1 className='text-3xl text-center font-bold'>Join as client or freelance</h1>

                            {/* Profile Picture Upload */}
                            <div className="flex p-4 border-dotted border-2 relative rounded-full border-stone-800 my-3 justify-center items-center h-40 w-40 overflow-hidden">
                                <label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                    />
                                    {!file && (
                                        <p className='text-center text-black text-xl'>
                                            <FaImage size={30} />
                                        </p>
                                    )}
                                    {file && (
                                        <img src={URL.createObjectURL(file)}
                                            alt="Preview"
                                            className='absolute inset-0 w-full h-full object-cover rounded-full' />
                                    )}
                                </label>
                            </div>
                            <ErrorMessage name="profile" component="div" className="text-red-500" />

                            {/* Form Fields */}
                            <div className='flex'>
                                <div className="flex flex-col w-full relative p-4">
                                    <label className='font-bold'>Full Name</label>
                                    <Field type="text" name="name" placeholder="Name" className="w-full p-2 rounded-md bg-transparent border-gray-700 border" />
                                    <ErrorMessage name="name" component="div" className="text-red-500" />
                                </div>
                                <div className="flex flex-col w-full relative p-4">
                                    <label className='font-bold'>Email</label>
                                    <Field type="email" name="email" placeholder="Email" className="w-full p-2 bg-transparent rounded-md border-gray-700 border" />
                                    <ErrorMessage name="email" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className='flex h-fit items-center'>
                                <div className="flex flex-col w-full relative p-4">
                                    <label className='font-bold'>Select a role</label>
                                    <Field as="select" name="role" placeholder="Role" className="w-full p-2 rounded-md border-gray-700 border">
                                        <option value="">Select a role</option>
                                        <option value="employee">Job seeker</option>
                                        <option value="employer">Client</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="text-red-500" />
                                </div>
                                {values.role === "employer" && (
                                    <div className="flex flex-col w-full relative p-4">
                                        <label className='font-bold'>Name of the company</label>
                                        <span className='text-sm text-emerald-400'>This name will be displayed to job seekers</span>
                                        <Field type="text" name="company" placeholder="Company" className="w-full p-2 bg-transparent rounded-md border-gray-700 border" />
                                        <ErrorMessage name="company" component="div" className="text-red-500" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col w-full relative p-4">
                                <label className='font-bold'>Select your Skill</label>
                                <Field as="select" name="skill" placeholder="Skill" className="w-full p-2 rounded-md border-gray-700 border">
                                    <option value="">Select a skill</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="skill" component="div" className="text-red-500" />
                            </div>

                            <div className='flex'>
                                <div className="flex flex-col w-full relative p-4">
                                    <label className='font-bold'>Password</label>
                                    <Field type="password" name="password" placeholder="Password" className="w-full bg-transparent p-2 rounded-md border-gray-700 border" />
                                    <ErrorMessage name="password" component="div" className="text-red-500" />
                                </div>
                                <div className="flex flex-col w-full relative p-4">
                                    <label className='font-bold'>Confirm Password</label>
                                    <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 bg-transparent rounded-md border-gray-700 border" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                                </div>
                            </div>

                            <div className='w-full mt-4'>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-green-700 to-teal-600 disabled:opacity-50 p-4 rounded-md text-white w-full"
                                >
                                  Create my account
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>        
      </section>
       
    );
}

export default Register;
