import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth'; // Assuming this is your authentication context

const UserProfile = () => {
  const { auth } = useAuth(); // Using the useAuth hook here to get the authenticated user's ID
    console.log(auth)
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/users/${auth.user.id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [auth]);

  const handleUpdate = () => {
    // Implement update logic here
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default UserProfile;
