import React from 'react'
import { useLocation , Link } from "react-router-dom"


const Success = () => {

    const location = useLocation()
  console.log(location)
   
    
    return (
      

    <div className="m-2 w-full max-w-md bg-green-200 p-4  py-5 rounded mx-auto flex flex-col gap-5 justify-center items-center">
      <p className="text-green-800 font-bold text-lg text-center">{Boolean(location?.state?.text) ? (location?.state?.text) :"Payment"}  Successfully</p>
    <Link to={"/"} className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all  px-4 py-1">Go to Home</Link>
        </div>
  )
}

export default Success
