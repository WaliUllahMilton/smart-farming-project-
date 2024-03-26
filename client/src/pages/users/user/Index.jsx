import React from 'react'
import { useAuth } from '../../../context/Auth'
import { NavLink } from 'react-router-dom'
const Index = () => {
    const{auth,setAuth}=useAuth()
    console.log(auth)
    // const data = auth
  return (
    // <pre>{JSON.stringify(auth)}</pre>
    // <h1>hilo</h1>
    <>
    {/* <p>{data}</p> */}
      {auth && auth.user &&(  
      <div className="bg-white overflow-hidden shadow rounded-lg border">
    <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
        </p>
    </div>
    <div className="border-t  border-gray-200 px-4 py-5 sm:p-0">
        <p className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">
                    Full name
                </p>
                <p className="mt-1 capitalize text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {auth.user.name}
                </p>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm font-medium text-gray-500">
                    Email address
                </p>
                <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {auth.user.email}
                </p>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <p className="text-sm  font-medium text-gray-500">
                    Address
                </p>
                <p className="mt-1 text-sm capitalize text-gray-900 sm:mt-0 sm:col-span-2">
                    {auth.user.address}
                </p>
            </div>
        </p>
    </div>
    
</div>)}
<div className='text-center my-8'>
<NavLink to='edit-user-profile' className="text-lg font-DM font-bold capitalize border-4 pt-2 pb-2 px-4 bg-orange-500">edit profile</NavLink>
</div>
    </>

  )
}

export default Index