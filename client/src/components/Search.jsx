import React, { useState, useRef, useEffect } from 'react';
import { HiMenuAlt4 } from "react-icons/hi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { useSearchData } from "../context/search";
import axios from "axios";

const Search = () => {
    const [toggleBtn, setToggleBtn] = useState(true);
    const [userToggleBtn, setUserToggleBtn] = useState(false);
    const [categoryToggleBtn, setCategoryToggleBtn] = useState(false);
    const [getAllCategory, setGetAllCategory] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [allProduct, setAllProduct] = useState([]);
    const [searchValue, setSearchValue] = useSearchData();
    const navigate = useNavigate();
    const userref = useRef();
    const categoryMenuRef = useRef();

    const AllCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/category/get-category");
            setGetAllCategory(response.data.category);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllProduct = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/product/get-product');
            setAllProduct(res.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
                setCategoryToggleBtn(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (userref.current.contains(e.target)) {
                setToggleBtn(false);
                setUserToggleBtn(true);
            } else {
                setToggleBtn(true);
                setUserToggleBtn(false);
            }
        });
        AllCategory();
        getAllProduct();
    }, []);

    useEffect(() => {
        // Filter products based on searchItem
        const filteredProducts = allProduct.filter(item =>
            item.name.toLowerCase().includes(searchItem.toLowerCase())
        );
        setSearchValue(filteredProducts);
    }, [searchItem, allProduct, setSearchValue]);

    const handleCategoryClick = (categoryName) => {
        // Filter products based on the selected category
        const filteredProducts = allProduct.filter(item =>
            item.category.name.toLowerCase() === categoryName.toLowerCase()
        );
        setSearchValue(filteredProducts);
    };

    const handleCategoryToggle = () => {
        setCategoryToggleBtn(!categoryToggleBtn);
    };

    return (
        <section className="bg-[#F5F5F3] py-6 ">
            <div className="flex justify-between w-container mx-auto">
                <div className="flex items-center gap-x-3">
                    <span className="text-[#262626]">
                        <HiMenuAlt4 />
                    </span>
                    <div className='relative'>
                        <p className="text-[#262626] text-sm cursor-pointer" onClick={handleCategoryToggle}>Shop by Category</p>
                        <ul ref={categoryMenuRef} className={`absolute top-8 bg-[#F5F5F3] w-36 mt- ${categoryToggleBtn ? '' : 'hidden'}`}>
                            {getAllCategory.map((item, index) => (
                                <li key={index}>
                                    <p className="border-b-2 pb-2 capitalize text-[#262626] text-sm cursor-pointer" 
                                    onClick={() => handleCategoryClick(item.name)}>
                                        {item.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="relative">
                    <input
                        className="outline-none w-[600px] py-4 px-5 border-2 border-solid"
                        type="text"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        placeholder="Search Product"
                    />
                    <span className="text-[#262626] text-sm absolute top-1/2 -translate-y-1/2 right-4">
                        <FaMagnifyingGlass />
                    </span>
                </div>
                <div className="flex gap-x-10 items-center">
                    <div className="flex gap-x-1 relative" ref={userref}>
                        <span className="text-[#262626] text-base">
                            <FaUser />
                        </span>
                        <span className="text-[#262626] text-base">
                            {toggleBtn ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                        </span>
                        {userToggleBtn && <Profile />}
                    </div>
                    <div className="relative" onClick={() => navigate('/cart')}>
                        <FaShoppingCart />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Search;
