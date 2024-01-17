// import React from 'react'
import { HiMenuAlt4 } from "react-icons/hi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUser,FaShoppingCart  } from "react-icons/fa";
import { IoMdArrowDropdown,IoMdArrowDropup  } from "react-icons/io";
import { useState,useRef,useEffect } from "react";
import Profile from "./Profile";
import CartPopUp from "./CartPopUp";
import { Link, useNavigate} from "react-router-dom";




const Search = () => {
    const [toggleBtn,setToggleBtn]= useState(true);
    const[userToggleBtn,setUserToggleBtn]= useState(false)
    const [cartToggleBtn,setCartToggleBtn]= useState(false)
    // const cartref = useRef();
    const navigate =useNavigate()
    const userref = useRef()
    useEffect(()=>{
        document.body.addEventListener("click",(e)=>{
            if(cartref.current.contains(e.target)){
                setCartToggleBtn(true)
            }else{
                setCartToggleBtn(false)
            }
         console.log()   
        })
    },[])
    useEffect(()=>{
        document.body.addEventListener("click",(e)=>{
            if(userref.current.contains(e.target)){
                setToggleBtn(false)
                setUserToggleBtn(true)
            }else{
                setToggleBtn(true)
                setUserToggleBtn(false)
            }
        })
    },[])

  return (
    <section className="bg-[#F5F5F3] py-6 ">
        <div className=" flex justify-between w-container mx-auto">
            <div className="flex items-center gap-x-3">
            <span className="text-[#262626]">
                < HiMenuAlt4/>
            </span>
            <p className="text-[#262626] text-sm">Shop by Category</p>
            </div>
            <div className="relative">
                <input className="outline-none w-[600px]  py-4 px-5 border-2 border-solid " type="text" placeholder="Search Product" />
                <span className="text-[#262626] text-sm absolute top-1/2 -translate-y-1/2 right-4">
                    <FaMagnifyingGlass/>
                </span>
            </div>
            <div className="flex gap-x-10 items-center">
                <div className="flex gap-x-1 relative" ref={userref}>
                    <span className="text-[#262626] text-base">
                      <FaUser/>
                    </span>
                    
                   {
                    toggleBtn?  
                    <span className="text-[#262626] text-base" >
                    <IoMdArrowDropdown/>
                    </span>
                    : 
                    <>
                         <span className="text-[#262626] text-base">
                        <IoMdArrowDropup/>
                        </span>
                    </>
                   }
                    {
                        userToggleBtn&&
                        <Profile/>
                    }
                </div>
                <div  className="relative" onClick={()=>navigate('/cart')}>
                    <FaShoppingCart/>
                    {cartToggleBtn&&
                    <CartPopUp/>
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Search