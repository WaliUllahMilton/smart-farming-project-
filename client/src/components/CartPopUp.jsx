import React from 'react';
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';
// import { Toast } from 'react-toastify/dist/components';

const CartPopUp = () => {
  const [cart, setCart] = useCart();
  // console.log(cart);
  const {auth,setAuth}=useAuth()

  return (
    <section className='absolute right-0 border mt-4'>
      {cart.map((cartItem) => (
        <div key={cartItem.id} className='w-[360px] border h-[120px] p-[20px] bg-[#F5F5F3] flex gap-x-[20px]  items-center justify-between'>
          <div className='w-20 h-20 bg-[#D8D8D8]'></div>
          <div>
            <p className='text-[#262626] font-DM text-sm font-bold mb-3'>{cartItem.name}</p>
            <p className='text-[#262626] font-DM text-sm text-center font-bold'>{cartItem.price} Tk</p>
          </div>
          <div>
            <p className='text-[#262626] font-DM text-sm font-bold'><ImCross/></p>
          </div>
        </div>
      ))}
      <div className='w-[360px] h-[120px] px-[20px] pb-[20px] pt-[14px] bg-[#FFF]'>
        <div className=''>
          <p className='text-[#767676] font-DM text-base leading-6 mb-[13px]'>Subtotal: <span className='text-[#262626] font-bold'>$44.00</span></p>
        </div>
        <div className='flex justify-between'>
          <Link className='text-[#262626] text-sm font-bold border border-[#2B2B2B] py-4 px-10' to="/cart">View Cart</Link>
          <Link className='text-[#fff] bg-[#262626] text-sm font-bold border border-[#2B2B2B] py-4 px-10'>Checkout</Link>
        </div>
      </div>
    </section>
  );
}

export default CartPopUp;
