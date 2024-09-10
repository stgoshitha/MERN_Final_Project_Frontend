import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from '../services/ApiEndPoint';

export default function Account() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await get(`/api/auth/user/${user.id}`);
        setUserDetails(response.data);
      } catch (err) {
        setError('Failed to fetch user data.');
        console.error(err);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <div>
      <h2>Account Details</h2>
      {error && <p>{error}</p>}
      {userDetails ? (
        <div>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
