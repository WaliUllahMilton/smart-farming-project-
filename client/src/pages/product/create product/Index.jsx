/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react'
import ImageUpload from '../../../components/ImageUpload'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom'


const Index = () => {
  const navigate = useNavigate()
    const{Option}=Select;
    const[name,setName]=useState('')
    const[description,setDescription]=useState(null)
    const[price,setPrice]=useState('')
    const[category,setCategory]=useState("")
    const[categories,setCategories]=useState([])
    const[quantity,setQuantity]=useState('')
    const[photo,setPhoto]=useState('')
    const[shipping,setShipping]=useState("")
    // ... other state variables
  console.log(category);
  const AllCategory = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/v1/category/get-category")
        // Update the state regardless of the response status
        setCategories(response.data.category)
        console.log(response.data.category) // Log the received data for debugging
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    AllCategory()
}, [])
const handleSubmit = async(e)=>{
  e.preventDefault()
  try {
    const productData = new FormData()
    productData.append("name",name)
    productData.append("description",description)
    productData.append("price",price)
    productData.append("quantity",quantity)
    productData.append("photo",photo)
    productData.append("shipping",shipping)
    productData.append("category",category)
    const res = await axios.post('http://localhost:8080/api/v1/product/create-product', productData)
    console.log("succes");
    // window.location.reload()
  } catch (error) {
    console.log(error);
  }
}
  return (
    <section>
        <div className='w-container mx-auto'>
          <h3  className='text-center mt-4 text-base capitalize font-bold'>Create a Product</h3>
        <div className='flex flex-col gap-4 items-center mt-6'>
          <Select
            bordered={false}
            placeholder="Select a category"
            showSearch
            size="large"
            className='border w-[250px]'
            onChange={(value) => setCategory(value)}
          >
            {categories?.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
         
            <label>
              {photo ? photo.name : <p className='border py-2 w-[250px] text-center text-[#262626] font-bold'>Click here to Upload Photo</p>}
              <input type="file"
              name='photo'
              accept='image/*'
              hidden
              onChange={(e)=>setPhoto(e.target.files[0])}/>
            </label>
     
            {photo&& (
             
                <img src={URL.createObjectURL(photo)} alt='img'/>
            
            )}
         
            <input type="text" placeholder='Write the Name'
            className='border py-2 w-[250px] text-center text-[#262626] font-bold outline-none'
            value={name}
            onChange={(e)=>setName(e.target.value)} />
          
          <textarea name="" id="" cols="30" rows="10"
          placeholder='Write the Description'
          className='border  w-[250px] h-[300px] text-[#262626] outline-none'
          value={description}
          onChange={(e)=>setDescription(e.target.value)} 
          >
          </textarea>
         
            <input type="number" placeholder='Set the price'
            className='border py-2 w-[250px] text-center text-[#262626] font-bold outline-none'
            value={price}
            onChange={(e)=>setPrice(e.target.value)} />
          
            <input type="number" placeholder='Give Quantity'
            className='border py-2 w-[250px] text-center text-[#262626] font-bold outline-none'
            value={quantity}
            onChange={(e)=>setQuantity(e.target.value)} />
          <p>Select Shipping</p>
          <Select
            bordered={false}
            placeholder="Select Shipping"
            size='large'
            showSearch
            value={shipping}
            onChange={(value) => { setShipping(value); }}
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>

          <button onClick={handleSubmit} className='py-1 px-4 border'>submit</button>
        </div>
        </div>

    </section>
  )
}

export default Index