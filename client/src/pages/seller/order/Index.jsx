import {useState,useEffect} from 'react'
import SellerDashboard from '../dashboard/Index'
import axios from 'axios'
import { Select } from 'antd'

const Index = () => {
  const{Option}=Select;
   const[status,setStatus]=useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"])
    const[changeStatus,setChangeStatus]=useState("")
    const [orders,setOrders]=useState([])
    const [allProduct, setAllProduct] = useState([]);
    const [imageData, setImageData] = useState({});
    // const [auth,setAuth]=useAuth()
    const getOrders = async()=>{
        // console.log(id)
        try {
            const{data}=await axios.get('http://localhost:8080/api/v1/auth/orders')
            setOrders(data)
            console.log(orders)
        } catch (error) {
            console.log(error)
        }
    }
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
    useEffect(()=>{
        // ke sure auth.user.id is a valid ObjectId
        getOrders()
        getAllProduct();
    }, []);
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
    const handleChange = async(OrderId,value)=>{
      try {
        const {data} = await axios.put(`http://localhost:8080/api/v1/auth/order-controll/${OrderId}`,{status:value});
        getOrders()
      } catch (error) {
        console.log(error)
      }
    }
   return (
    <>
    <SellerDashboard/>
    {orders.map((order) => (
      <div key={order._id}>
        {/* <p>Buyer: {order.buyer.name}</p> */}
        <p>Products:</p>
        <ul>
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
        </ul>
        <p>
          <Select bordered={false}
          onChange={(value)=>handleChange(order._id,value)}
          defaultValue={order?.status}>
          
          {status.map((s,i)=>(
            <Option key={i} value={s}></Option>
          ))}
          </Select>
        </p>
        <p>Order Date: {order.createdAt}</p>
      </div>
    ))}
    </>
  )
}

export default Index