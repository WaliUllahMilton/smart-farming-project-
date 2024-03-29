import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Index';
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
// import CreateProduct from './pages/product/create product/Index';
import AllProducts from './pages/product/all products/Index';
import User from './pages/users/user/Index';
import UserProfileUpdate from './pages/users/user/profileUpdate/Index';
import Orders from './pages/users/orders/Index';
import Admin from './pages/admin/Index';
import ForgotPassword from './pages/users/forgot/Index';
import { AuthProvider } from './context/Auth';
// import PrivateRoute from './route/SellerRoute'; // Import PrivateRoute
import CartPage from './pages/users/cart/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import SellerRout from './route/SellerRoute';
import SellerOutlet from './route/SellerOutlet';
import CustumerOutlet from './route/CustimerOutlet';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
           
            <Route path='shop' element={<Shop/>}/>
           
            
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Route>
          <Route path="/seller-register" element={<SellerRegistration />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          {/* <Route path="/seller/*" element={<SellerRoutes />} /> */}
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/seller' element={<SellerOutlet/>}>
            <Route path='dashboard' element={<SellerDashboard/>}/>
            <Route path='all-product' element={<AllProducts/>}/>
            <Route path='category' element={<CreateCategory/>}/>
            <Route path='orders' element={<SellerOrder/>}/>

          </Route>
         <Route element={<Layout/>}>
         <Route path='/' element={<CustumerOutlet/>}>
            <Route path='user' element={<User/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path="/cart" element={<CartPage />} />
            <Route path='user/edit-user-profile' element={<UserProfileUpdate/>}/>
            <Route path='orders' element={<SellerOrder/>}/>

          </Route>
         </Route>
          {/* <Route path="/seller/dashboard" element={<><SellerDashboard/></>}/> Wrap PrivateRoute in Route */}
        </Routes>
      </AuthProvider>
      <ToastContainer/>
    </Router>
  );
};

// const SellerRoutes = () => {
//   return (
//     <Routes>
//       <Route path="dashboard" element={<SellerDashboard />} />
//       <Route path="category" element={<CreateCategory />} />
//       <Route path="all-product" element={<AllProducts />} />
//       <Route path="create-product" element={<CreateProduct />} />
//       <Route path="orders" element={<SellerOrder />} />
//     </Routes>
//   );
// };

export default App;