import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminDashboad from './pages/AdminDashboad'
import { Toaster } from 'react-hot-toast'



function App() {
  return (
    <div>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<AdminDashboad />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App