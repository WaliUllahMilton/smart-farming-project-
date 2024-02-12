/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import {useState,useEffect} from 'react'
import { useAuth } from '../../../context/Auth'
const Index = () => {
    const [orders,setOrders]=useState([])
    const [auth,setAuth]=useAuth()
    
    const getOrders = async(id)=>{
        console.log(id)
        try {
            const{data}=await axios.get(`http://localhost:8080/api/v1/auth/orders/${id}`)
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if (auth?.token && auth?.user?.id) {
            getOrders(auth.user.id); // Make sure auth.user.id is a valid ObjectId
        }
    }, [auth?.token]);
    // console.log(auth)

   
    
  return (
    <div>
        {/* <p>{JSON.stringify(orders,null,4)}</p> */}
        {orders.map((order) => (
      <div key={order._id}>
        {/* <p>Buyer: {order.buyer.name}</p> */}
        <p>Products:</p>
        <ul>
          {order.products.map((product) => (
            <li key={product._id}>
              Product ID: {product.product}, Quantity: {product.quantity}
            </li>
          ))}
        </ul>
        <p>Status: {order.status}</p>
        <p>Order Date: {order.createdAt}</p>
      </div>
    ))}
    </div>
  )
}

export default Index