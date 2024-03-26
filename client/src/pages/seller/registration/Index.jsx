/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useState } from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';const index = () => {
    const[name,setName]=useState()
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[address,setAddress]=useState()
    const[phoneNumber,setphoneNumber]=useState()
    const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const {res} = await axios.post("http://localhost:8080/api/v1/auth/seller-register",{name,email,password,address,phoneNumber});
            navigate("/seller-login");
            // console.log(res)
            // const resData = res.resData
            // console.log((resData))
            toast.success("Registration Successfully")
        } catch (error) {
            console.log(error)
            toast.error("R")
        }

    }

  return (
    <section className='pt-[124px] pb-[140px]'>
        <div className='w-container mx-auto'>
            <h3 className='text-[#262626] font-DM text-[49px] font-bold'>Sign up</h3>
            <p className='flex items-center gap-x-2 mt-2 text-[#6D6D60] font-DM text-xs '>Home  <FaGreaterThan/>  Sign up</p>
            <p className='w-[644px] text-[#767676] text-base leading-[30px] mt-[127px] mb-[120px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
            <h3 className='text-[#262626] font-DM text-[39px] font-bold'>Your Personal Details</h3>
            <div className='mt-[42px]'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-wrap gap-y-6 gap-x-[391px] mb-[29px]'>
                            <div>
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Name</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="text" placeholder='Write your Name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Email Address</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="email" placeholder='yourmail@something.com'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Address</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="text" placeholder='Write your Address'
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Write Your Phone Number</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="text" placeholder='Write your phoneNumber'
                                value={phoneNumber}
                                onChange={(e)=>setphoneNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Password</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b'  type="password" placeholder='*********'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                    </div>
                        <button className='py-4 px-20 text-[#262626] font-DM text-base font-bold border border-[#2B2B2B]'>Register</button>
                    </form>
                    
            </div>
        </div>
    </section>
  )
}

export default index