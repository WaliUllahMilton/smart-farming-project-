import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSellerAuth } from '../context/Auth'; // Import useSellerAuth from the correct location

const SellerPrivateROute = () => {
  const { sellerAuth } = useSellerAuth(); // Destructure sellerAuth from the returned context value

  // If sellerAuth.token is not set, redirect to the login page
  if (!sellerAuth.token) {
    return <Navigate to="/seller-login" />;
  }

  // If sellerAuth.token is set, render the nested routes
  return <Outlet />;
};

export default SellerPrivateROute;
