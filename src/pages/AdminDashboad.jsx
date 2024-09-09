import React, { useEffect, useState } from 'react';
import { get, del } from '../services/ApiEndPoint'; 
import AdminSidebar from '../components/AdminSidebar';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

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
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
      toast.success('Delete Success');
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    (user.role === 'jobSeeker' || user.role === 'employer') &&
    (
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    ));

  // Pagination logic
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-96 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto mt-6">
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
            <tbody className="text-black text-xs md:text-sm font-light">
              {currentUsers.map((el) => (
                <tr className="border-b border-gray-200 hover:bg-gray-100" key={el._id}>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left whitespace-nowrap border-b-2">{el._id}</td>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left whitespace-nowrap border-b-2">{el.firstName} {el.lastName}</td>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left whitespace-nowrap border-b-2">{el.email}</td>
                  <td className="py-2 md:py-3 px-2 md:px-6 text-left whitespace-nowrap border-b-2">{el.role}</td>
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
            className="bg-blue-500 text-white w-32 px-3 py-2 text-xs md:text-sm rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous 
          </button>
          <div className="bg-gray-500 text-white w-12 h-8 p-1 text-xs md:text-sm rounded-md flex items-center justify-center">
            <label>{currentPage}</label>
          </div>
          <button
            className="bg-blue-500 text-white w-32 px-3 py-2 text-xs md:text-sm rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
