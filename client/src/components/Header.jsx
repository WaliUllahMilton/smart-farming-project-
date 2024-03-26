// import React from 'react'
import Image from './Image'
import Logo from '../assets/Logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Profile from './Profile'
import { FaUser } from 'react-icons/fa6'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { useEffect, useRef, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useAuth } from '../context/Auth'

const Header = () => {
    const userref = useRef();
    const [toggleBtn, setToggleBtn] = useState(true);
    const [userToggleBtn, setUserToggleBtn] = useState(false);
    const navigate = useNavigate();
    const {auth,setAuth}=useAuth()
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (userref.current.contains(e.target)) {
                setToggleBtn(false);
                setUserToggleBtn(true);
            } else {
                setToggleBtn(true);
                setUserToggleBtn(false);
            }
        });
    }, []);

  return (
    <section>
        <nav className='flex justify-between  items-end w-container py-8 mx-auto '> 
            <div className='w-[100px]'>
                <Link to='/'>
                    <Image src={Logo} alt='logo.png'/>
                </Link>
            </div>
            {auth.token ? (
                <div className='ml-[280px]'>
                <ul className='flex gap-x-10'>
                    <li><NavLink to='/' className='text-[#767676] font-DM text-sm [&.active]:text-[#262626]' href='#'>Home</NavLink></li>
                    {/* <li><NavLink to='/shop'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Shop</NavLink></li> */}
                    <li><NavLink to='/contacts'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Contacts</NavLink></li>
                    <li><NavLink to='/journal'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Journal</NavLink></li>
                </ul>
            </div>
            ):(
            <div className='ml-[280px]'>
            <ul className='flex gap-x-10'>
                <li><NavLink to='/' className='text-[#767676] font-DM text-sm [&.active]:text-[#262626]' href='#'>Home</NavLink></li>
                {/* <li><NavLink to='/shop'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Shop</NavLink></li> */}
                <li><NavLink to='/seller/dashboard'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Seller</NavLink></li>
                <li><NavLink to='/contacts'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Contacts</NavLink></li>
                <li><NavLink to='/journal'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Journal</NavLink></li>
            </ul>
        </div>)}
            
            <div>

            </div>
            <div className="flex gap-x-10 items-center">
                    
                    <div className="relative" onClick={() => navigate('/cart')}>
                        <FaShoppingCart />
                    </div>
                    <div className="flex gap-x-1 relative" ref={userref}>
                        <span className="text-[#262626] text-base">
                            <FaUser />
                        </span>
                        <span className="text-[#262626] text-base">
                            {toggleBtn ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                        </span>
                        {userToggleBtn && <Profile/>}
                    </div>
                </div>
        </nav>
        <hr />
    </section>
  )
}

export default Header