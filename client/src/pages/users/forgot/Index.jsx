/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../context/Auth';
import axios from 'axios';
import { FaGreaterThan } from 'react-icons/fa6';

const Index = () => {
    const navigate = useNavigate()
    // const[user,setUser]=useState()
    const [email,setEmail]= useState();
    const [answer,setAnswer]= useState();
    const [newPassword,setNewPassword]=useState();
    // const [auth,setAuth]=useAuth();
    console.log(email)
    console.log(newPassword)
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/forgot-password",{email,answer,newPassword})
            // const {data} =res;
            // const{token,user}=data
            navigate('/login')
            // localStorage.setItem('auth',JSON.stringify(res.data))
            // // localStorage.setItem('token',token)
            // setUser(user)
            // setAuth({
            //     ...auth,
            //     user:res.data.user,
            //     token:res.data.token 
            // })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <section className='pt-[124px] pb-[140px]'>
    <div className='w-container mx-auto'>
        <h3 className='text-[#262626] font-DM text-[49px] font-bold'>Forgot Password</h3>
        <p className='text-[#6D6D60] font-DM text-xs mt-3 flex items-center gap-x-2'>Home <FaGreaterThan/> Forgot-Password</p>
        <p className='w-[644px] text-[#767676] font-DM text-base leading-[30px] mt-[127px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
        <hr className=' mt-[62px]' />
        <h3 className='text-[#262626] font-DM text-[39px] font-bold mt-[57px]'>Returning Customer</h3>
        <div className=' '>
            <form onSubmit={handleSubmit}>
               <div className='flex flex-wrap gap-y-4 gap-x-[391px] mb-[29px]'>
                    <div>
                        <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Email Address</label>
                        <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="text" placeholder='yourmail@something.com'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Answer</label>
                        <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b' type="text" placeholder='yourmail@something.com'
                        value={answer}
                        onChange={(e)=>setAnswer(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="" className='mb-3 text-[#262626] font-DM text-base font-bold leading-6'>Password</label>
                        <input className='block outline-none w-[500px] text-[#767676] font-DM text-sm border-b'  type="password" placeholder='*********'
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}/>
                    </div>
               </div>
                <button className='py-4 px-20 text-[#262626] font-DM text-base font-bold border border-[#2B2B2B] hover:text-[#fff] hover:bg-[#2b2b2b] transition-all delay-100'>Log in</button>
            </form>
            
              {/* <p onClick={handleForgotPassword} className='mt-3 inline-block cursor-pointer text-[#262626] font-DM text-base font-bold leading-6'>Forgot Password ?</p> */}
            
        </div>
        <hr  className='mt-[70px] mb-[58px]'/>
    <h3 className='text-[#262626] font-DM text-[39px] font-bold'>New Customer</h3>
    <p className='w-[644px] text-[#767676] text-base leading-[30px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
    <button className='mt-[67px] py-4 px-20 text-[#fff] font-DM text-base font-bold border bg-[#2B2B2B] border-[#2B2B2B]'>Continue</button>
    </div>
</section>
  )
}

export default Index