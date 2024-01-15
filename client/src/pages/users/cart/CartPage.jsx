/* eslint-disable react/jsx-key */
import  { useEffect, useState } from 'react';
import { useCart } from '../../../context/Cart';
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";
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
  const totalPrice = () => {
    try {
        let total = 0;

        // Optional chaining to handle the case where cart is undefined or null
        cart?.map((item) => {
            total = total + parseFloat(item.price);
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
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/product/braintree/payment',
        {
          nonce,
          cart
        }
      );
      setLoading(false)
      // Handle the response as needed
        console.log("hoise");
      // Update the cart in local storage after successful payment
      localStorage.removeItem("cart");
      setCart([]);
  
      // Navigate after successful payment
      navigate("/order");
  
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
      <div className=' flex mx-auto w-container mt-10 justify-between'>
      <div className='text-center font-DM flex flex-col justify-center'>
        {/* <h1 className=' text-base font-bold text-[#262626]'>
          {`Hello ${auth?.token && auth?.user?.name}`}
        </h1> */}
        {cart.map((cartItem) => (
          <div key={cartItem._id} className='flex items-center  w-[800px] border-b-2 gap-x-10'>
            <div className='h-[100px] w-[100px] '>
              <img
                className='object-cover'
                src={imageData[cartItem._id]}
                alt=""
                // onClick={() => (cartItem._id)}
              />
            </div>
            <h2 className='w-[350px]'>{cartItem.name}</h2>
            <h2 className='w-[100px]'>Price: {cartItem.price} Tk</h2>
            <button className='border py-3 px-6 bg-[#262626] text-[#fff]'
            onClick={()=>handleCartRemove(cartItem._id
            )}>delete</button>
          </div>
        ))}
      </div>
        <>
        <p className='font-DM text-lg font-bold mr-20'>Checkout | Payment</p>
        <p>total :{totalPrice()}</p>
        <div>
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
                className='mt-4'
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
