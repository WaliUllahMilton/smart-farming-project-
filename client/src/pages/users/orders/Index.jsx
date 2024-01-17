import axios from 'axios'
import {useState,useEffect} from 'react'
import { useAuth } from '../../../context/Auth'
const Index = () => {
    const [orders,setOrders]=useState([])
    const [auth,setAuth]=useAuth()
    const getOrders = async()=>{
        try {
            // const{data}=await axios.get('http://localhost:8080/api/v1/auth/orders')
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(auth?.token) getOrders()
    },[auth?.token])
  return (
    <div>
        <p>{JSON.stringify(orders,null,4)}</p>
    </div>
  )
}

export default Index