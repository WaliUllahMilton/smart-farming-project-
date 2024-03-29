import { Navigate } from "react-router-dom";
import { useSellerAuth } from "../context/Auth";
export default function SellerRout({children}){
  const auth= useSellerAuth();
  return auth ? children : <Navigate to="/seller-login"/>
}