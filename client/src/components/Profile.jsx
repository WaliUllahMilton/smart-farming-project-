import {  NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
// import axios from "axios";
const Profile = () => {
  const navigate = useNavigate()
 const{auth,setAuth}= useAuth()
//  const userID =auth.user.id
 const handleLogOut = ()=>{
  setAuth({
    ...auth, user:"",token:""
  })
  localStorage.removeItem('auth');
  navigate('/')
 }
// const handleUserProfile = async (userID) => {
//   try {
//     // const response = await axios.get(`/api/v1/auth/user/${userID}`);
//     // const userData = response.data; // Extracting data from the response
//     // Now you can do something with userData
//     console.log(userID)
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//   }
// };

  return (
    <>
        <section className="absolute right-0 top-12   ">
            <ul className= "w-[200px] ">
                
                
              
                {
                  !auth.user? 
                  <>
                  {/* <li className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#FFF] " to=''>User</NavLink></li> */}
                  <li className="bg-[#fff] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#767676]" to='/login'>Login</NavLink></li>
                  <li className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#FFF] " to='/register'>Registration</NavLink></li>
                 </>
                  :
                 <>
                  <li   className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink to="user" className="text-[#FFF]  " >{
                    <pre>{auth.user.name}</pre>
                  }</NavLink></li>
                  
                    <li className="bg-[#fff] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#767676] " to='orders'>My Order</NavLink></li>
                  <li className="bg-[#2B2B2B] w-full text-center py-4 font-bold text-base"><NavLink className="text-[#fff]" onClick={handleLogOut} >Log Out</NavLink></li>
                
                 </>
                }
            </ul>
        </section>
    </>
  )
}

export default Profile