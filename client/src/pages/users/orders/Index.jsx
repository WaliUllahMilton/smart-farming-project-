/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import {useState,useEffect} from 'react'
import { useAuth } from '../../../context/Auth'
const Index = () => {
  const [orders, setOrders] = useState([]);
  const {auth, setAuth} = useAuth();
  const [allProduct, setAllProduct] = useState([]);
  const [imageData, setImageData] = useState({});

  const getAllProduct = async () => {
      try {
          const res = await axios.get("http://localhost:8080/api/v1/product/get-product");
          setAllProduct(res.data.products);
      } catch (error) {
          console.log(error);
      }
  };

  const getProductPhoto = async (productId) => {
      try {
          const res = await axios.get(`http://localhost:8080/api/v1/product/get-product-photo/${productId}`);
          const base64String = res.data;
          setImageData(prevState => ({
              ...prevState,
              [productId]: `data:image/png;base64,${base64String}`
          }));
      } catch (error) {
          console.log(error);
      }
  };

  const getOrders = async (id) => {
      try {
          const { data } = await axios.get(`http://localhost:8080/api/v1/auth/orders/${id}`)
          setOrders(data);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      getAllProduct();
  }, []);

  useEffect(() => {
      if (auth?.token && auth?.user?.id) {
          getOrders(auth.user.id);
      }
  }, [auth?.token]);

  useEffect(() => {
      const fetchImages = async () => {
          orders.forEach(order => {
              order.products.forEach(product => {
                  getProductPhoto(product.product);
              });
          });
      };
    
      fetchImages();
  }, [orders]);

    // console.log(auth)

   
    
  return (
    <div className='w-container mx-auto'>
        {/* <p>{JSON.stringify(orders,null,4)}</p> */}
        {orders.map((order) => (
      <div key={order._id}>
        {/* <p>Buyer: {order.buyer.name}</p> */}
        <p>Products:</p>
        <ul className=''>
          {order.products.map((product) => (
            
            <li key={product._id} className=' flex justify-around'>
              <img
                            className=' object-cover w-[100px]'
                            src={imageData[product.product]}
                            alt=""
                            // onClick={() => handleImageClick(product._id)}
                        />
              Product ID: {product.product}, Quantity: {product.quantity}
            </li>
          ))}
        <p>Status: {order.status}</p>
        <p>Order Date: {order.createdAt}</p>
        </ul>
      </div>
    ))}
    </div>
  )
}

export default Index