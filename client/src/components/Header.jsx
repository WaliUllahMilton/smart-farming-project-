// import React from 'react'
import Image from './Image'
import Logo from '../assets/Logo.png'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <section>
        <nav className='flex justify-between items-end w-container py-8 mx-auto '> 
            <div className='w-[100px]'>
                <Link to='/'>
                    <Image src={Logo} alt='logo.png'/>
                </Link>
            </div>
            <div>
                <ul className='flex gap-x-10'>
                    <li><NavLink to='/' className='text-[#767676] font-DM text-sm [&.active]:text-[#262626]' href='#'>Home</NavLink></li>
                    <li><NavLink to='/shop'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Shop</NavLink></li>
                    <li><NavLink to='/seller/dashboard'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Seller</NavLink></li>
                    <li><NavLink to='/contacts'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Contacts</NavLink></li>
                    <li><NavLink to='/journal'className='text-[#767676] [&.active]:text-[#262626]' href='#'>Journal</NavLink></li>
                </ul>
            </div>
            <div>

            </div>
        </nav>
    </section>
  )
}

export default Header