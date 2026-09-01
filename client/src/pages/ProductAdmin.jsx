

import React,{useState,useEffect} from 'react'
import Axios from "../utils/Axios"
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from "../utils/AxiosToastError"
import Loading from "../components/Loading"
import ProductCardAdmin from "../components/ProductCardAdmin"
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {

   const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search,setSearch] = useState("")
    

    const fetchProductData = async () => {
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                  page: page,
                  limit: 12,
                  search:search
                }
            })

            const { data: responseData } = response
            console.log(responseData)
          if (responseData.success) {
              setTotalPageCount(responseData.totalNoPage)
                setProductData(responseData.data)
                  
              }

        } catch (error) {
           AxiosToastError(error) 
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
    fetchProductData()
},[page])

  
 console.log("product data",productData) 
   
  const handleNext = () => {
    if (page !== totalPageCount) {
       setPage(preve => preve + 1)
    }
   
  }

   const handlePrevious = () => {
    if (page > 1) {
       setPage(preve => preve - 1)
    }
   
  }
  
  const handleOnChange = (e) => {

    const { value } = e.target
   
    setSearch(value)
     setPage(1)
  }

  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
      if (flag) {
            fetchProductData()
        flag = false
        }
      
      }, 300);
   
    return () => {
      clearTimeout(interval)
    }
    
},[search])

  
  return (
    <section>
           < div className="p-2  bg-white  shadow-md flex items-center justify-between gap-4">
    
          <h2 className="font-semibold">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-2 flex items-center gap-2 py-1  rounded border  focus-within:border-amber-400">
          <IoSearchOutline size={23 } />
            <input
              type="text"
            placeholder="Search product here..."
            className="h-full w-full  py-2 outline-none bg-transparent"
            onChange={handleOnChange}
            value={search}
          />
          </div>
            
             
      </div>

      {
        loading && (
          <Loading />
        )
      }

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-col-6 gap-4 ">
        {
        productData.map((product,index) => {
          return (
            <ProductCardAdmin data={product} fetchProductData={fetchProductData}   />
          )
        })
      }

      </div>
       </div>
      </div>

      {/*add button* */}

      <div className="flex justify-between my-4">
        <button onClick={handlePrevious} className="border border-amber-400 rounded px-4 py-1  cursor-pointer hover:bg-amber-400">Previous</button>
        <span className="w-full bg-slate-100 text-center">{page} / {totalPageCount}</span>
        <button onClick={handleNext} className="border border-amber-400 rounded px-4 py-1 cursor-pointer hover:bg-amber-400">Next</button>
      </div>

    
    </section>
  )
}

export default ProductAdmin
