import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import InputField from '../components/InputField';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '', 
    role: 'jobSeeker', 
  });

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post('/api/auth/register', formData);
      toast.success('Registration successful')
      navigate('/login');

    } catch (error) {
      console.error('Error during registration', error);
      toast.error('Registration failed')
    }
  };

  return (
    <>
    <Header/> 
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register As</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => handleRoleSelect('jobSeeker')}
            className={`w-1/2 py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none ${
              formData.role === 'jobSeeker' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Jobseeker
          </button>
          <button
            onClick={() => handleRoleSelect('employer')}
            className={`w-1/2 py-2 px-4 border border-gray-300 rounded-r-md focus:outline-none ${
              formData.role === 'employer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Employer
          </button>
        </div>
        <form onSubmit={handleSubmit}>
        
          <div className='flex gap-5'>
          <InputField
        id="name"
        label="First Name"
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First name"
        required
      />
      <InputField
        id="name"
        label="Last Name"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last name"
        required
      />
      
          </div>
      <InputField
        id="email"
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />

<hr className='mt-5 mb-2'/>
      <div>
        <InputField
        id="password"
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <InputField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RegisterPage;
