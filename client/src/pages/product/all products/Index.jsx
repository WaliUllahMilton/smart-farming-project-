import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateProduct from '../create product/Index'
import SellerDashboard from '../../seller/dashboard/Index';

const Index = () => {
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
    const handleDelete = async(product)=>{
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${product._id}`)
            getAllProduct()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllProduct();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            allProduct.forEach(product => {
                getProductPhoto(product._id);
            });
        };
        
        fetchImages();
    }, [allProduct]);

    const handleImageClick = (productId) => {
        // Perform any action when the image is clicked
        console.log(`Image clicked for product with ID: ${productId}`);
        // You can add more functionality here if needed
    };

    return (
        <section>
            <SellerDashboard/>
            <CreateProduct/>
            <div className='w-container mx-auto'> 
            <h1 className='text-center mb-4'>List of Products</h1>
            <div className='flex justify-right gap-x-6 flex-wrap'>
                {allProduct.map(product => (
                    <div key={product._id} className='border'>
                        <div className='w-[200px] h-[300px]'>
                        <img
                            className=' object-cover'
                            src={imageData[product._id]}
                            alt=""
                            onClick={() => handleImageClick(product._id)}
                        />
                        </div>
                        <h3>Name: {product.name}</h3>
                        <h3>Description: {product.description}</h3>
                        <h3>Price: {product.price}</h3>
                        <h3>Product ID: {product._id}</h3>
                        <h3>Shipping: {product.shipping ? 'Yes' : 'No'}</h3>
                        <button onClick={()=>handleDelete(product)}>Delete</button>
                    </div>
                ))}
            </div>
            </div>
        </section>
    );
};

export default Index;
