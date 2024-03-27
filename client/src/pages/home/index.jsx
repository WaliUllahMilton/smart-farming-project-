import { useEffect, useState } from 'react';
// import { useAuth } from '../../context/Auth';
import { useCart } from '../../context/Cart';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchData } from '../../context/search';
import Search from '../../components/Search';
import {  useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
const Home = () => {
  const navigate=useNavigate()
  const [cart, setCart] = useCart();
  const [allProduct, setAllProduct] = useSearchData();
  const [imageData, setImageData] = useState({});
 
  // const [auth, setAuth] = useAuth();

  const getAllProduct = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/product/get-product');
      setAllProduct(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductPhoto = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/product/get-product-photo/${productId}`);
      const base64String = res.data;
      setImageData((prevState) => ({
        ...prevState,
        [productId]: `data:image/png;base64,${base64String}`,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      allProduct.forEach((product) => {
        getProductPhoto(product._id);
      });
    };
  
    fetchImages();
  }, [allProduct]);


  // const handleAddToCart = (product) => {
  //   const existingCartItemIndex = cart.findIndex(item => item._id === product._id);
  
  //   if (existingCartItemIndex !== -1) {
  //     // Product is already in the cart, increment quantity
  //     const updatedCart = [...cart];
  //     updatedCart[existingCartItemIndex].quantity++;
  //     setCart(updatedCart);
  //     localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   } else {
  //     // Product is not in the cart, add it
  //     const newCartItem = {
  //       ...product,
  //       quantity: 1,
  //     };
  //     const updatedCart = [...cart, newCartItem];
  //     setCart(updatedCart);
  //     localStorage.setItem('cart', JSON.stringify(updatedCart));
  //   }
  
  //   toast.success('Product added to Cart');
  // };
  const handleAddToCart = (product) => {
    const existingCartItemIndex = cart.findIndex(item => item._id === product._id);
  
    if (existingCartItemIndex !== -1) {
      // Product is already in the cart, increment quantity
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity++;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // Product is not in the cart, add it
      const newCartItem = {
        ...product,
        quantity: 1,
      };
      const updatedCart = [...cart, newCartItem];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Show toast notification when the product is added to the cart
      toast.success('Product added to Cart',{
        position:"top-center",
        autoClose:2000
      });
    }
  };
  
  const handleBUy =(product)=>{
    handleAddToCart(product)
    navigate('/cart')
  }
  


  
  return (
    <section>
      <Search/>
      <div className='w-full'>
        <div className=' w-container mx-auto mt-[40px] mb-[80px]'>
         <div className='flex justify-center  gap-6 flex-wrap'>
         {allProduct.length===0 ? <>
          <MoonLoader color="#36d7b7" />
         </> :
         allProduct.map((product) => (
          <div key={product._id} className='border font-DM w-[400px] rounded-lg overflow-hidden shadow-md'>
            <div className='w-full h-[250px]'>
              <img
                className='object-cover w-full h-full'
                src={imageData[product._id]}
                alt={product.name}
              />
            </div>
            <div className='py-3 px-4 capitalize text-[#262626]'>
              <h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
              <p className='text-sm mb-2'>{product.description}</p>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-lg font-bold'>{product.price}TK.</span>
                <span className='text-sm'>{product.shipping ? 'Shipping: Yes' : 'Shipping: No'}</span>
              </div>
              <div className='flex justify-center space-x-4'>
                <button
                  className='border px-4 py-2 bg-[#262626] text-[#fff] text-sm font-bold rounded hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300'
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className='border px-8 py-2 bg-[#262626] text-[#fff] text-sm font-bold rounded hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300'
                  onClick={() => handleBUy(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))
        }
         </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
