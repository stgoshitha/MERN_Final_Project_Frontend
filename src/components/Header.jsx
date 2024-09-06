import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div >
        <div className='flex justify-center items-center h-16 bg-gray-500'>
        <div className='flex '>
            <ul class="flex gap-4">
                <Link><li className=''>Home</li></Link>
                <Link><li>About</li></Link>
                <Link><li>Contact</li></Link>
                <Link to={'/login'}><li>Login</li></Link>
            </ul>
        </div>
        </div>
        
    </div>
  )
}
