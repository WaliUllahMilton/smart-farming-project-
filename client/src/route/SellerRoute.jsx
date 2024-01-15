/* eslint-disable no-unused-vars */
import React from 'react'
import { useSellerAuth } from '../context/Auth'
import { Navigate, Outlet } from 'react-router-dom'
// import {SellerDashboard} from '../pages/seller/dashboard/Index'
const PrivateRoute = () => {
    const [auth,setAuth] = useSellerAuth()
    console.log(auth.token)
    console.log(auth)
  return auth.token==""? <Navigate to='/seller-login'/> : <Outlet/>
}

export default PrivateRoute