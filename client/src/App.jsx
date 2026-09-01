import {Outlet,useLocation} from "react-router-dom"
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import toast , {Toaster} from "react-hot-toast"

import fetchUserDetails from "./utils/fetchUserDetails"
import { useEffect } from "react"
import { setUserDetails } from "./store/userSlice"
import { useDispatch } from "react-redux"
import { setAllCategory,setAllSubCategory ,setLoadingCategory} from "./store/productSlice"
import Axios from "./utils/Axios"
import SummaryApi from "./common/SummaryApi"
import GlobalProvider from "./provider/GlobalProvider"
import  AxiosToastError from "./utils/AxiosToastError"
import CartMobileLink from "./components/CartMobileLink"

function App() {

  const dispatch = useDispatch()
  const location = useLocation()

  //console.log(location)
  
  const fetchUser = async () => {

    const userData = await fetchUserDetails()
    //console.log("userData", userData.data)
    dispatch(setUserDetails(userData.data))
  }

   const fetchCategory = async () => {
        
        try {
          
          dispatch(setLoadingCategory(true))
            const response = await Axios({
                ...SummaryApi.getCategory
            })
           
            const { data :responseData} = response
             //console.log("allcategory",responseData)
          if (responseData.success) {
            //console.log("responseData.data",responseData.data)
              dispatch(setAllCategory(responseData.data))
                //setCategoryData(responseData.data)
            }
              //  console.log(responseData)

        }catch (error) {
      AxiosToastError(error)
      
    }
          
         finally {
            dispatch(setLoadingCategory(false))
        }
    }

 const fetchSubCategory = async () => {
        
        try {
          

            const response = await Axios({
                ...SummaryApi.getSubCategory
            })

            const { data :responseData} = response

          if (responseData.success) {
            //console.log("subcategoryapipage",responseData.data)
              dispatch(setAllSubCategory(responseData.data))
                //setCategoryData(responseData.data)
            }
               // console.log(responseData)

        } catch (error) {
            console.log(error)
        }
    }





  useEffect(() => {
  
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    
},[])



  return (
    <GlobalProvider>
      
      <Header />
      
      <main  className="min-h-[78vh]">
           <Outlet/>
      </main>
     
      
      <Footer />
      <Toaster />
      {
        location.pathname !== "/checkout" && (
           < CartMobileLink/>
        )
     }
      
      
      </GlobalProvider>
  )
}

export default App
