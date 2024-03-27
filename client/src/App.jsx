/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Index';
// import About from './pages/seller/login/Index';
import Shop from './pages/shop/Index';
import Contacts from './pages/contacts/Index';
import Journal from './pages/journal/Index';
import Login from './pages/users/login/Index';
import Registration from './pages/users/registration/index';
import SellerRegistration from './pages/seller/registration/Index';
import SellerLogin from './pages/seller/login/Index';
import SellerDashboard from './pages/seller/dashboard/Index';
import SellerOrder from './pages/seller/order/Index';
import CreateCategory from './pages/category/Index';
import CreateProduct from './pages/product/create product/Index';
import AllProducts from './pages/product/all products/Index';
import User from './pages/users/user/Index';
import UserProfileUpdate from './pages/users/user/profileUpdate/Index';
import Orders from './pages/users/orders/Index';
import Admin from './pages/admin/Index';
import ForgotPassword from './pages/users/forgot/Index';
import PrivateRoute from './route/PrivateRoute';
import SellerRoute from './route/SellerRoute';
import CartPage from './pages/users/cart/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CartPage from './pages/users/cart';
// import { SellerAuthProvider } from './context/SellerAuth';

const App = () => {
  return (
    <>
   
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path='/*' element={<PrivateRoute/>}> */}
            <Route path='shop' element={<Shop/>}/>
            <Route path='user' element={<User/>}/>
            <Route path='user/edit-user-profile' element={<UserProfileUpdate/>}/>
            <Route path='orders' element={<Orders/>}/>
          {/* </Route> */}
          {/* <Route path="/shop" element={<PrivateRoute><Shop /></PrivateRoute>} /> */}
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} /> */}
        </Route>
        <Route path="/seller-register" element={<SellerRegistration />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller" element={<SellerRoute/>}>
        <Route path='/seller-PROFILE' element={<SellerRoute/>}>

        </Route>
        </Route>
        <Route path='/seller' element={<SellerRoute/>}>
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="category" element={<CreateCategory />} />
            <Route path="all-product" element={<AllProducts />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="orders" element={<SellerOrder />} />
        </Route>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </Router>

    <ToastContainer/>
    </>

  );
};

export default App;
