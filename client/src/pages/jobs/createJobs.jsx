import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast, Progress } from '@chakra-ui/react';
import axios from 'axios';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/UseAuth';
function CreateJobs() {
    const user = useSelector(selectCurrentUser); 
    const isEmployer= useAuth(['employer'])
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        company: user?.company || "",
        details: "",
        skills: [],
        category_id: "",
        user_id: user?.id || ""
    });
    const [skill, setSkill] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5555/categories');
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSkill = () => {
        if (skill) {
            setFormData({ ...formData, skills: [...formData.skills, skill] });
            setSkill(""); // Clear input after adding skill
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await axios.post('http://127.0.0.1:5555/job/jobs', formData);
            console.log(formData)
            if (res.status === 200) {
                toast({
                    title: 'Job created successfully',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                onClose();
                setFormData({title:"", company:"", skills:[], details:""})
            }
        } catch (error) {
            toast({
                title: 'Error creating job',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
        {isEmployer &&(
             <button onClick={onOpen} className='px-8 py-3 text-white bg-gradient-to-r float-right from-stone-800 to-green-700 rounded-lg'>
                Create Jobs
            </button>
        )}
           
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='text-center text-2xl font-bold'>Create a Job Opportunity</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label htmlFor="category_id" className='font-bold'>Job Category:</label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className='w-full p-2 border rounded-md'
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col mt-4'>
                                <label htmlFor="title" className='font-bold'>Job Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className='w-full border p-2 rounded-md'
                                    required
                                />
                            </div>

                            <div className='flex flex-col mt-4'>
                                <label htmlFor="details" className='font-bold'>Job Description:</label>
                                <textarea
                                    id="details"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    className='w-full border p-2 rounded-md'
                                    placeholder="Enter job description"
                                    required
                                />
                            </div>

                            <div className='flex flex-col mt-4'>
                                <label htmlFor="skills" className='font-bold'>Skills:</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="skills"
                                        value={skill}
                                        onChange={(e) => setSkill(e.target.value)}
                                        className='w-full border p-2 rounded-md'
                                        placeholder="Add a skill"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSkill}
                                        className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md'
                                    >
                                        Add Skill
                                    </button>
                                </div>
                                <div className='mt-2'>
                                    {formData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className='inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mt-2'
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {isSubmitting && <Progress size="xs" isIndeterminate className="my-4" />}
                            
                            <button
                                type="submit"
                                className='w-full bg-emerald-600 text-white py-3 rounded-full mt-4'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Create Job'}
                            </button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default CreateJobs;
