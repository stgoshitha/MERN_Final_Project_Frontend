import React,{useEffect} from 'react'
import { get } from '../services/ApiEndPoint'

export default function AdminDashboad() {
  
  useEffect(() => {
    console.log('AdminDashboad')
    const GetUser = async()=>{
      try {
        const request = await get('/api/admin/getUser');
        const response = request.data
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
    GetUser()
  },[])
  return (
    <div>
      <h1>Admin</h1>
    </div>
  )
}

