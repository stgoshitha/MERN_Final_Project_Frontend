import React, { useEffect, useState } from 'react';
import { get, del } from '../services/ApiEndPoint'; 
import AdminSidebar from '../components/AdminSidebar';
import AdminNavBar from '../components/AdminNavBar';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get('/api/admin/getUser'); 
        if (response.status === 200) {
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
      const response = await del(`/api/admin/delete/${id}`); 
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); 
        console.log('User deleted successfully:', response.data);
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Filter users based on search query and role
  const filteredUsers = users
    .filter(user => user.role === 'admin') // Filter by role 'admin'
    .filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
    <AdminNavBar/>
    <div className='flex'>

      <div>
        <AdminSidebar />
      </div>
      <div className="w-full p-8 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
          <div className="mb-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Id</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredUsers.map((el) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={el._id}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">{el._id}</td>
                    <td className="py-3 px-6 text-left">{el.name}</td>
                    <td className="py-3 px-6 text-left">{el.email}</td>
                    <td className="py-3 px-6 text-left">{el.role}</td>
                    <td className="py-3 px-6 text-left">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
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
        </div>
    </div>
    </>
  );
}
