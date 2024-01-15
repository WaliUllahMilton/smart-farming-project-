/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SellerDashboard from '../seller/dashboard/Index'

const Index = () => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    // const[toggleBtn,setToggleBtn]=useState('hidden')
    const [getAllCategory, setGetAllCategory] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/api/v1/category/create-category", { name })
            console.log(response.data)
            // Refresh the category list after successful creation
            AllCategory()
            setName("")
        } catch (error) {
            console.log(error)
        }
    }

    const AllCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/category/get-category")
            // Update the state regardless of the response status
            setGetAllCategory(response.data.category)
            console.log(response.data) // Log the received data for debugging
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        AllCategory()
    }, []) // Empty dependency array to run only once
    const handleDelete = async (item)=>{
        console.log(item._id);
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/category/category-delete/${item._id}`)
            console.log(item);
            AllCategory();
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdate = async(item)=>{
        try {
            setName(item.name)
            if(name!=item.name){

                const res = await axios.put(`http://localhost:8080/api/v1/category/category-update/${item._id}`,{name})
                
            }
            AllCategory()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section>
            <SellerDashboard/>
           <div className='flex justify-center mt-10'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="categoryInput"className='capitalize text-base font-bold'>Category name :</label>
                    <input
                        type="text"
                        id="categoryInput"
                        className='border outline mx-2 py-1'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className=' dhoro border py-1 px-4 bg-[#262626] text-[#fff] font-bold capitalize'>Create category</button>
                </form>
                   
           </div>
        
           <div className='mt-20   '>
           {
                getAllCategory.map((item, index) => (
                    <>
                    
                        <div className='flex justify-center gap-x-4 mb-3'>
                        <h3 key={index} className='border w-[200px] text-center'>{item.name}</h3>
                        <button onClick={()=>handleDelete(item)} 
                        className='border py-1 px-4 bg-[#262626] text-[#fff] font-bold capitalize'>delete</button>
                        <button onClick={()=>handleUpdate(item)}
                        className='border py-1 px-4 bg-[#262626] text-[#fff] font-bold capitalize'>Update</button>
                        </div>
                    </>
                ))
            }
           </div>
        </section>
    )
}

export default Index
