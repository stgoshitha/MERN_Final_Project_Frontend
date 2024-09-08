import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <div className="bg-gray-800 h-screen w-64">
      <div className="flex justify-center items-center  bg-gray-500">
        <h1 className="text-white text-xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex flex-col">
        <Link
          to="/"
          className="text-white text-lg hover:bg-gray-700 p-5 text-left rounded-md transition duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/admin"
          className="text-white text-lg hover:bg-gray-700 p-5 rounded-md transition duration-200"
        >
          Users
        </Link>
        <Link
          to="/admin/AdminManage"
          className="text-white text-lg hover:bg-gray-700 p-5 rounded-md transition duration-200"
        >
          Admin Manage
        </Link>
      </div>
    </div>
  )
}
