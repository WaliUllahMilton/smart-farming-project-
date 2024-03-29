import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/Auth"

export default function SellerOutlet(){
    const {auth}= useAuth()

    return auth.token ? <Outlet/> : <Navigate to="/login"/>
}