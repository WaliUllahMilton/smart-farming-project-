import { Navigate, Outlet } from "react-router-dom"
import { useSellerAuth } from "../context/Auth"

export default function SellerOutlet(){
    const {sellerAuth}= useSellerAuth()

    return sellerAuth.token ? <Outlet/> : <Navigate to="/seller-login"/>
}