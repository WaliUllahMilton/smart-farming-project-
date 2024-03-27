/* eslint-disable react/jsx-key */
// import React from 'react'

import { Link } from "react-router-dom"
import Logo from '../assets/Logo.png'
import Image from "./Image"
import { FaFacebookF,FaInstagram   } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";



const Footer = () => {
  let menuarr = [
    {text:"Home"}, 
    {text:"Shop"}, 
    {text:"About"}, 
    {text:"Contact"},
    {text:"Journal"}
    ]
  let shoparr = [
    {text: "Category 1"},
    {text: "Category 1"},
    {text: "Category 1"},
    {text: "Category 1"},
    {text: "Category 1"},
  ]
  let helparr = [
    {text:'Privacy Policy'},
    {text:'Terms & Conditions'},
    {text:'Special E-shop'},
    {text:'Shipping'},
    {text:'Secure Payments'},
  ]
  const [getAllCategory, setGetAllCategory] = useState([]);
    const AllCategory = async () => {
      try {
          const response = await axios.get("http://localhost:8080/api/v1/category/get-category");
          setGetAllCategory(response.data.category);
      } catch (error) {
          console.log(error);
      }
  };
  useEffect(()=>{
    AllCategory()
  },[])
  
  return (
    <section className="bg-[#F5F5F3]">
      <div className="w-container mx-auto flex justify-between pt-14 pb-16">
        <div className="flex gap-x-[150px]"> 
        <ul>
          <li className="text-[#262626] font-DM font-bold text-base leading-6 mb-4 uppercase">Menu</li>
          {
            menuarr.map((item)=>(
              <li className="mb-[6px]">
                <Link to='#' className="text-[#6D6D6D] text-sm font-DM leading-4 capitalize">{item.text}</Link>
              </li>
            ))
          }
          <li className="flex mt-[65px] gap-x-4 text-[#262626]">
            <Link><FaFacebookF/></Link>
            <Link><FaLinkedinIn/></Link>
            <Link><FaInstagram/></Link>
          </li>
        </ul>
        <ul>
          <li className="text-[#262626] font-DM font-bold text-base leading-6 mb-4 uppercase">SHOP</li>
          {
            getAllCategory.slice(0,5).map((item)=>(
              <li className="mb-[6px]">
                <Link to='#' className="text-[#6D6D6D] text-sm font-DM leading-4 capitalize">{item.name}</Link>
              </li>
            ))
          }
        </ul>
        <ul>
          <li className="text-[#262626] font-DM font-bold text-base leading-6 mb-4 uppercase">HELP</li>
          {
            helparr.map((item)=>(
              <li className="mb-[6px]">
                <Link to='#' className="text-[#6D6D6D] text-sm font-DM leading-4 capitalize">{item.text}</Link>
              </li>
            ))
          }
        </ul>
        </div>
        <ul>
          <li className="text-[#262626] font-DM font-bold text-base leading-7 mb-4 uppercase w-[186px]">(052) 611-5711
          company@domain.com</li>
          <li className="mb-[6px]">
            <Link to='#' className="text-[#6D6D6D] text-sm font-DM leading-4 capitalize">575 Crescent Ave. Quakertown, PA 18951</Link>
          </li>
        </ul>
        <div>
          <Image src={Logo} alt='Logo not found'/>
          <p className="mt-[211px] text-[#6D6D6D] font-DM text-sm leading-4 text-right">2020 Orebi Minimal eCommerce Figma Template by Adveits</p>
        </div>
      </div>
    </section>
  )
}

export default Footer

