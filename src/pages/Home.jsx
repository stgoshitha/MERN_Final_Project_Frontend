import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'; // Import Axios
import { Logout } from '../redux/AuthSlice';


export default function Home() {

  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(user)

  const goToAdmin = () => {
    navigate('/admin')
  }

  const handelLogout =async() => {
    try {
      const request = await axios.post('api/auth/logout')
      const respone = request.data
      if(request.status==200){
        dispatch(Logout())
        navigate('/login')
      } 
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <Header />
      <div className="home-container flex items-center justify-center min-h-screen bg-gray-100">
  <div className="user-card bg-white p-8 rounded-lg shadow-md text-center">
    <h2 className="text-2xl font-semibold mb-4">Welcome, {user && user.name}</h2>
    <button className="logout-btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 mb-2 w-96" onClick={handelLogout}>Logout</button><br
    />
{user?.role === 'admin' && (
            <button className="admin-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-96" onClick={goToAdmin}>
              Go to Admin
            </button>
          )}    
  </div>
</div>

    </div>
  )
}
