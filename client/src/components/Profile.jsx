import {  NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
const Profile = () => {
  const navigate = useNavigate()
 const[auth,setAuth]= useAuth()
 const handleLogOut = ()=>{
  setAuth({
    ...auth, user:"",token:""
  })
  localStorage.removeItem('auth');
  navigate('/')
 }
  return (
    <>
        <section className="absolute right-0 top-9   ">
            <ul className= "w-[200px] ">
                
                
              
                {
                  !auth.user? 
                  <>
                  <li className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#FFF] " to=''>User</NavLink></li>
                  <li className="bg-[#fff] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#767676]" to='/login'>Login</NavLink></li>
                  <li className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#FFF] " to='/register'>Registration</NavLink></li>
                 </>
                  :
                 <>
                  <li className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#FFF] " to=''>{
                    <pre>{JSON.stringify(auth.user.name)}</pre>
                  }</NavLink></li>
                    <li className="bg-[#fff] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#767676] " to=''>My Order</NavLink></li>
                  <li className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#fff]" onClick={handleLogOut} >Log Out</NavLink></li>
                
                 </>
                }
            </ul>
        </section>
    </>
  )
}

export default Profile