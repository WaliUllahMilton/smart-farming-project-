import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSellerAuth } from '../../context/Auth.jsx';

const Index = () => {
  const { sellerAuth } = useSellerAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/v1/auth/user', {
        headers: {
          Authorization: `Bearer ${sellerAuth.token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [sellerAuth.token]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
       <>
         <h2 className='text-center mt-4 text-lg font-DM text-amber-400 font-bold'>User Management</h2>
        <ul className="divide-y w-container mx-auto divide-gray-200">
          {users.map(user => (
            <li key={user.id} className="py-4 flex justify-between items-center">
             <div className=' '>
             <div>
                <p className="text-lg font-semibold">Name :{user.name}</p>
                <p className="text-gray-500">Email :{user.email}</p>
              </div>
              <div className="text-gray-500">
                <p>User ID:{user._id}</p>
              </div>
             </div>
             <div>
              <button className='bg-orange-300 px-4 py-3 rounded text-white font-DM text-base font-semibold'> Delete User</button>
             </div>

            </li>
          ))}
        </ul>
       </>
      )}
    </>
  );
};

export default Index;
