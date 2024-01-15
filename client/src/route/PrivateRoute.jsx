/* eslint-disable no-unused-vars */
import React from 'react'
import { useAuth } from '../context/Auth'
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoute = () => {
    const [auth,setAuth] = useAuth()
    console.log(auth.token)
    console.log(auth)
  return auth.token==""? <Navigate to='/login'/> : <Outlet/>
}

export default PrivateRoute