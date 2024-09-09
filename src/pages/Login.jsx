import React, { useState } from 'react';
import { post } from '../services/ApiEndPoint';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const request = await post('/api/auth/login', { email, password });
      const response = request.data;
      if (request.status === 200) {
        if (response.user.role === 'admin') {
          navigate('/');
        } else if (response.user.role === 'jobSeeker') {
          navigate('/');
        } else if (response.user.role === 'employer') {
          navigate('/');
        }
        toast.success('Login Success');
        dispatch(SetUser(response.user));
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:p-10">
        <div className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-10 shadow-md rounded-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative mt-4">
              <InputField
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                onMouseLeave={() => setShowPassword(false)}
                className="absolute inset-y-0 right-0 px-4 py-2 text-sm text-gray-600 focus:outline-none"
              >
                {showPassword ? <BiHide className='w-6 h-6' /> : <BiShow className='w-6 h-6' />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:underline">Create an account, Register</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
