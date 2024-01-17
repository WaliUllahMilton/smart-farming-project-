/* eslint-disable react/jsx-key */
import  { useEffect, useState } from 'react';
import { useCart } from '../../../context/Cart';
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";
import { FaLessThan,FaGreaterThan } from "react-icons/fa6";
// import {  } from "react-icons/fa6";


// import toastify from 'react-toastify'
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken,setClientToken]=useState("")
  const [instance,setInstance]=useState("")
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const [imageData, setImageData] = useState({});
  
// console.log(clientToken)
  const handleCartRemove = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecreament = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const handleincreament = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId && item.quantity < 10
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const totalPrice = () => {
    try {
        let total = 0;

        // Optional chaining to handle the case where cart is undefined or null
        cart?.map((item) => {
            total = total + parseFloat(item.price*item.quantity);
        });

        // Formatting the total as currency using toLocaleString
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "BDT",
        });
    } catch (error) {
        // Log any errors that might occur during the calculation
        console.log(error);
    }
};
  const getToken = async ()=>{
    try {
      const{data}=await axios.get('http://localhost:8080/api/v1/product/braintree/token')
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getToken()
  },[auth?.token])



  const handlePayment = async () => {
    try {
        setLoading(true); // Set loading to true before making the payment request
        const { nonce } = await instance.requestPaymentMethod();
        
        // Make a POST request to the server with payment details
        const { data } = await axios.post(
            'http://localhost:8080/api/v1/product/braintree/payment',
            {
                nonce,
                cart,
                auth
            }
        );

        setLoading(false); // Set loading to false after the payment request is made

        // Handle the response as needed
        console.log("hoise");

        // Update the cart in local storage after successful payment
        localStorage.removeItem("cart");
        setCart([]);

        // Navigate after successful payment
        navigate("/orders");

        // Display a success message (commented out)
        // toastify.success("Payment completed successfully")
    } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false regardless of success or failure
    } 
};

  
  const getProductPhoto = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/product/get-product-photo/${productId}`);
      const base64String = res.data;
      setImageData(prevState => ({
        ...prevState,
        [productId]: `data:image/png;base64,${base64String}`,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cart.forEach(cartItem => {
      getProductPhoto(cartItem._id); // Fetch images for each product in cart
    });
  }, [cart]);

  return (
    <section >
      <div className=' flex-col mx-auto w-container mt-10 justify-between'>
      <div className='text-center font-DM flex flex-col justify-center mx-auto w-[1000px]'>
        {/* <h1 className=' text-base font-bold text-[#262626]'>
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1> */}
        {cart.map((cartItem) => (
          <div key={cartItem._id} className='flex items-center border-b-2 gap-x-10'>
            <div className='h-[100px] w-[260px] overflow-hidden relative '>
              <img
                className='object-cover max-w-full absolute top-[50%] translate-y-[-50%] w-auto h-auto'
                src={imageData[cartItem._id]}
                alt=""
                // onClick={() => (cartItem._id)}
              />
            </div>
            <h2 className='w-[350px] text-lg font-DM font-semibold'>{cartItem.name}</h2>
            <div className='flex'>
              <button onClick={()=>handleDecreament(cartItem._id)} className='font-DM text-sm'>< FaLessThan/></button>
            <h2 className='mx-3 text-lg font-DM font-semibold'>{cartItem.quantity}</h2>
              <button onClick={()=>handleincreament(cartItem._id)} className='font-DM text-sm'>< FaGreaterThan/></button>
            </div>
            <h2 className='w-[300px] flex'>Price: {cartItem.price*cartItem.quantity} Tk</h2>
            <button className='border py-3 px-6 bg-[#262626] text-[#fff]'
            onClick={()=>handleCartRemove(cartItem._id
            )}>delete</button>
          </div>
        ))}
      </div>
        <>
        <p className='font-DM text-lg text-right font-bold mt-10'>Checkout | Payment</p>
        <p className='text-right'>total :{totalPrice()}</p>
        <div className="w-[400px] ml-[70vw]">
          {
            !clientToken || !cart?.length ? (""):(
              <>
              <DropIn 
                options={
                  {
                    authorization:clientToken,
                    paypal:{
                      flow:'vault'
                    }
                  }
                }
                onInstance={instance => setInstance(instance)}
                />
                <button
                className='mt-4 text-center ml-[50%] translate-x-[-50%]'
                onClick={handlePayment}
                // disabled={!loading || !auth?.user  }
                >{loading ? "processing...." : "Make Payment"}</button>
              </>
            )
          }
        
        </div>
       
        </>
      </div>
    </section>
  );
};

export default CartPage;
