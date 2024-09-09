import React, { useEffect, useState } from 'react';
import { get, del } from '../services/ApiEndPoint'; 
import AdminSidebar from '../components/AdminSidebar';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';

export default function AdminManage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '', 
    role: 'admin', 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get('/api/admin/getUser'); 
        if (response.status === 200) {
          console.log('Fetched users:', response.data.users); 
          setUsers(response.data.users); 
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await del(`/api/admin/delet/${id}`); 
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); 
        console.log('User deleted successfully:', response.data);
        toast.success('Delete Success');
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

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
      toast.success('Registration successful');
      navigate('/login'); 
      closeModal();
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredUsers = users.filter(user => 
    (user.role === 'admin') &&
    (`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminSidebar className="md:w-1/4 lg:w-1/5 xl:w-1/6" />
      <div className="flex-1 p-4 md:p-8">
        <div className='flex flex-col md:flex-row items-center justify-between mb-4'>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-center md:text-left">
            Admin Information Management
          </h1>
          <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-96 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={openModal}
              className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add Admin
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-500 text-gray-100 uppercase text-xs md:text-sm leading-normal">
                <th className="py-2 md:py-3 px-2 md:px-6 text-left rounded-tl-xl">Id</th>
                <th className="py-2 md:py-3 px-2 md:px-6 text-left">Name</th>
                <th className="py-2 md:py-3 px-2 md:px-6 text-left">Email</th>
                <th className="py-2 md:py-3 px-2 md:px-6 text-left">Role</th>
                <th className="py-2 md:py-3 px-2 md:px-6 text-left rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs md:text-sm font-light">
              {currentUsers.map((el) => (
                <tr className="border-b border-gray-200 hover:bg-gray-100" key={el._id}>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left border-b-2">{el._id}</td>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left border-b-2">{el.firstName} {el.lastName}</td>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left border-b-2">{el.email}</td>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left border-b-2">{el.role}</td>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left border-b-2">
                    <button
                      className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-red-600 transition duration-300"
                      onClick={() => handleDelete(el._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white w-24 md:w-32 px-3 py-2 text-xs md:text-sm rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex justify-items-center gap-2 md:gap-5">
            <div className="bg-gray-500 text-white w-8 md:w-12 h-8 p-1 text-xs md:text-sm rounded-md flex items-center justify-center">
              <label>{currentPage}</label>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white w-24 md:w-32 px-3 py-2 text-xs md:text-sm rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className='flex gap-5'>
              <InputField
                id="firstName"
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
              <InputField
                id="lastName"
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
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
                placeholder="Enter email"
                required
              />
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
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
              >
                Add Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
