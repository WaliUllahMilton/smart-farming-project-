import { useEffect, useState } from 'react';
import { useAuth } from '../../context/Auth';
import { useCart } from '../../context/Cart';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const [cart, setCart] = useCart();
  const [allProduct, setAllProduct] = useState([]);
  const [imageData, setImageData] = useState({});
  const [auth, setAuth] = useAuth();

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

  const handleAddToCart = (product) => {
    // Check if the product already exists in the cart
    const isProductInCart = cart.some((item) => item._id === product._id);
  
    if (isProductInCart) {
      // Product already exists in the cart, display a message or handle accordingly
      toast.warning('Product already in Cart');
      return;
    }
  
    // Product doesn't exist in the cart, add it to the cart state
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    toast.success('Product added to Cart');
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  return (
    <section>
      <div>
        <div className='flex justify-right gap-x-6 flex-wrap w-container mx-auto mt-[40px] mb-[80px]'>
          {allProduct.map((product) => (
            <div key={product._id} className='border font-DM w-[400px]'>
              <div className='w-full h-[250px]'>
                <img
                  className='object-cover w-full'
                  src={imageData[product._id]}
                  alt=''
                />
              </div>
              <div className='py-3 px-3 capitalize text-[#262626]'>
                <h3>Name: {product.name}</h3>
                <h3>Description: {product.description}</h3>
                <h3>Price: {product.price}TK.</h3>
                <h3>Shipping: {product.shipping ? 'Yes' : 'No'}</h3>
                <div className='flex justify-center gap-x-10 mt-10'>
                  <button
                    className='border px-4 py-2 bg-[#262626] text-[#fff] capitalize font-bold'
                    onClick={() => handleAddToCart(product)}
                  >
                    add to cart
                  </button>
                  <button className='border px-12 py-2 bg-[#262626] text-[#fff] capitalize font-bold'>
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
