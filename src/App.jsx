import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminDashboad from './pages/AdminDashboad'
import { Toaster } from 'react-hot-toast'
import AdminLayouts from './Layouts/AdminLayouts'
import UserLayouts from './Layouts/UserLayouts'
import PublicLayouts from './Layouts/PublicLayouts'



function App() {
  return (
    <div>
      <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path='/admin' element={<AdminLayouts/>}>
          <Route index element={<AdminDashboad />} />
          </Route>
          
          <Route path='/' element={<UserLayouts/>}>
          <Route index element={<Home/>}/>
          </Route>

          <Route path='/' element={<PublicLayouts/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App