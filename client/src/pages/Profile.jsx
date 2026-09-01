
import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit"
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import setUserDetails from "../store/userSlice"
import fetchUserDetails from "../utils/fetchUserDetails"

const Profile = () => {

  const user = useSelector(state => state.user)
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false)
  
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile:user.mobile,
  })

  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {

      setUserData({
      name: user.name,
      email: user.email,
      mobile:user.mobile,
    })
  },[user])  //to update sidebar



  console.log("profile", user)
  

  const handleOnChange = (e) => {
    const {name,value} = e.target
  
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value
      }

      
      
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefautl()

    try {

      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data :userData
      })
console.log("updatedprofile",response)
      const { data: responseData } = response
      
      if (responseData.success) {
        toast.success(responseData.message)
        
    const userData = await fetchUserDetails() //to update sidebar and  myaccount
    
    dispatch(setUserDetails(userData.data))
      }


    } catch (error) {
      AxiosToastError(error)
    } finally {
        setLoading(false)
    }
    
  }


  return (


    <div className="p-4">
         
      {/*profile upload and display image*/ }
      <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">

        {
          user.avatar ? (


            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
              
              
               <FaRegUserCircle size={60} />
          )
        }

       

      </div>
      <button  onClick={()=>setOpenProfileAvatarEdit(true)} className="text-sm min-w-20 
        border border-amber-300 hover:border-amber-400 hover:bg-amber-400 px-3 py-1 rounded-full mt-3 cursor-pointer">Edit</button>

      
      {  
        openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={()=>setOpenProfileAvatarEdit(false)} />
        )
      }
         
      {/* name, mobile , email ,change password*/ }

      <form  className="my-4  grid gap-4" onSubmit={handleSubmit}>
        <div  className="grid">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border border-amber-200 focus-within:border-amber-400"
            name="name"
            required
            value={userData.name}
          onChange={handleOnChange}
          />
        </div>

        <div  className="grid">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
              required
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border border-amber-200 focus-within:border-amber-400"
          name="email"
            value={userData.email}
          onChange={handleOnChange}
          />
        </div>

           <div  className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            type="text"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border border-amber-200 focus-within:border-amber-400"
            name="mobile"
              required
            value={userData.mobile}
          onChange={handleOnChange}
          />
        </div>

        
        <button className="border border-amber-300 text-amber-600 hover:text-neutral-800 rounded px-4 py-2 font-semibold hover:bg-amber-400 cursor-pointer">
          {
            loading ? "Loading...":"Submit"
          }
        </button>
      </form>


    </div>
  )
}

export default Profile
