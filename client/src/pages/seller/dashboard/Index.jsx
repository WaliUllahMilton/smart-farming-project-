import React from 'react'
import { NavLink } from 'react-router-dom'
import {  useSellerAuth } from '../../../context/Auth'

const SellerDashboard = () => {
  const[sellerAuth,setSellerAuth]= useSellerAuth();
  const handleLogOut = ()=>{
    setSellerAuth({
      ...sellerAuth, user:"",token:""
    })
    localStorage.removeItem('sellerAuth');
    // navigate('/')
   }
  return (
    <section>
      <div className='w-container mx-auto mt-3 '>
        <ul className='flex gap-x-10 justify-center'>
                    <li><NavLink to='/seller/category' className='text-[#767676] font-DM text-base capitalize font-bold [&.active]:text-[#262626]' href='#'>category</NavLink></li>
                    <li><NavLink to='/seller/all-product'className='text-[#767676] [&.active]:text-[#262626] text-base capitalize font-bold' href='#'>products</NavLink></li>
                    <li><NavLink to='/seller/orders'className='text-[#767676] [&.active]:text-[#262626] text-base capitalize font-bold' href='#'>orders</NavLink></li>
                    <li><NavLink to='/seller'className='text-[#767676] [&.active]:text-[#262626] text-base capitalize font-bold' href='#' onClick={handleLogOut}>Log Out</NavLink></li>
                    {/* <li><NavLink to='/contacts'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Contacts</NavLink></li> */}
                    {/* <li><NavLink to='/journal'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Journal</NavLink></li> */}
        </ul>
      </div>
                {/* {
      <pre>{JSON.stringify(sellerAuth,null,4)}</pre>
    } */}
    </section>
  )
}

export default SellerDashboard