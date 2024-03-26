import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../context/Auth';

const ProfileUpdate = () => {
    const { auth, setAuth } = useAuth();
    console.log(auth)
    const userId = auth.user.id; // Get the user ID from the auth context
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, address } = formData;

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/auth/edit-profile/${userId}`, { name, email, address });
            alert('Profile updated successfully!');
            
            // Update local storage data
            const updatedUserData = { ...auth.user, name, email, address };
            const updatedAuth = { ...auth, user: updatedUserData };
            localStorage.setItem('auth', JSON.stringify(updatedAuth));
            setAuth(updatedAuth);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating profile. Please try again later.');
        }
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 outline-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 outline-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 py-2 px-4 text-white rounded-md hover:bg-indigo-700">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileUpdate;
