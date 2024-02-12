/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useState } from 'react'
import { FaGreaterThan } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const index = () => {
    const[name,setName]=useState()
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[address,setAddress]=useState()
    const[answer,setAnswer]=useState()
    const[error,setError]=useState()
    const[passError,setPassError]=useState()
    const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        const givenPassword=password
        e.preventDefault();
        try {
            if (!name || !email || !address || !answer) {
                setError("Every field is required");
            }
            else if (!(givenPassword.length >= 8) || !/[A-Z]/.test(givenPassword) || !/[a-z]/.test(givenPassword) || !/\d/.test(givenPassword)) {
                setPassError("Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number");
            }
           
            else{
                setPassword(givenPassword)
                const {res} = await axios.post("http://localhost:8080/api/v1/auth/register",{name,email,password,address,answer});
                navigate("/login");
                console.log(res)

            }
        } catch (error) {
            console.log(error)
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
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Email Address</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="email" placeholder='yourmail@something.com'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Name</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="text" placeholder='Write your Name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
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
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>What is your favorite game?</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="text" placeholder='Write your Answer'
                                value={answer}
                                onChange={(e)=>setAnswer(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Password</label>
                                <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b'  type="password" placeholder='*********'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                // onChange={(e) => setPassError('')}
                                />
                                <p>{passError}</p>
                            </div>
                    </div>
                        <p>{error}</p>
                        <button className='py-4 px-20 text-[#262626] font-DM text-base font-bold border border-[#2B2B2B]'>Sign Up</button>
                    </form>
            </div>
        </div>
    </section>
  )
}

export default index