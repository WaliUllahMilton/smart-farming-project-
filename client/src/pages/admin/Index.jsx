import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoonLoader, RingLoader } from 'react-spinners';

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminCheck, setAdminCheck] = useState(false);
  const[password,setPassword]=useState('')
  const[name,setName]=useState('')

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/v1/auth/user');
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/auth/${id}`);
      // After deletion, you may want to refresh the user list
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/admin-login', {
        name: name,
        password: password
      });
      if (res.data.success) {
        setAdminCheck(true);
        // Optionally, you may want to store authentication token or user information in state/context
      } else {
        // Handle authentication failure
        console.log('Authentication failed:', res.data.message);
      }
    } catch (error) {
      // Handle request error
      console.log('Error:', error.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {adminCheck ? (
        <>
          <h2 className='text-center mt-4 text-lg font-DM text-amber-400 font-bold'>User Management</h2>
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <MoonLoader color="#36D7B7" size={50} />
            </div>
          ) : users.length === 0 ? (
            <div className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
              <RingLoader className='mx-auto my-auto' color="#36d7b7" />
              <p className='text-center mt-4'>No users found.</p>
            </div>
          ) : (
            <ul className="divide-y w-container mx-auto divide-gray-200">
              {users.map(user => (
                <li key={user.id} className="py-4 flex justify-between items-center">
                  <div className=' '>
                    <div>
                      <p className="text-lg font-semibold">Name: {user.name}</p>
                      <p className="text-gray-500">Email: {user.email}</p>
                      <p className="text-gray-500">Role: {user.role}</p>
                    </div>
                    <div className="text-gray-500">
                      <p>User ID: {user._id}</p>
                    </div>
                  </div>
                  <div>
                    <button className='bg-orange-300 px-4 py-3 rounded text-white font-DM text-base font-semibold' onClick={() => { handleUserDelete(user._id) }}>Delete User</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Sign in</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm flex-col gap-4 -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none rounded-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none rounded-none mt-4 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>)}
    </>
  );
};

export default Index;
