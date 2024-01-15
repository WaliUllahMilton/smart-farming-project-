/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Search from './Search'


const Layout = ( )=> {
  return (
    <>
        <Header/>
        <Search/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout