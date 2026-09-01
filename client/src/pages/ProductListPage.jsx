
import React,{useEffect, useState} from 'react'
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import {useParams,Link} from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import Loading from "../components/Loading"
import CardProduct from '../components/CardProduct'
import {useSelector} from "react-redux"
import { valideURLConvert } from '../utils/valideURLConvert'


const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const[loading,setLoading]= useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [displaySubCategory,setDisplaySubCategory]= useState([])
  const AllSubCategory = useSelector(state => state.product.allSubCategory || [])
 
 // console.log("Allsubcategoryproductlistpage",AllSubCategory)
  
  
  const params = useParams()
 // console.log("paramsproductlistpage",params)
  
  const subCategory = params?.subCategory?.split("-")
 // console.log("subCategoryproductlistpage",subCategory)
  const subCategoryName = subCategory?.slice(0,subCategory?.length -1)?.join(" ")
 //console.log("subcategorynameproductlistpage",subCategoryName)
  
  const categoryId = params.category.split("-").slice(-1)[0] 
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]
  console.log("categoryId", categoryId, "subCategoryId", subCategoryId)
  
  


  const fetchProductData = async () => {
 
  
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId : categoryId,
          subCategoryId:  subCategoryId,
          page: page,
          limit :8
        }
      })

      const { data: responseData } = response
      
      if (responseData.success) {
        if (responseData.page == 1) {
           setData(responseData.data)
        } else {
           setData([...data,...responseData.data])
        }

        console.log("responseDataproductlistpage",responseData)
        setTotalPage(responseData.totalCount)
       
      }


    } catch (error) {

      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
  fetchProductData()
},[params.category,params.subCategory])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id === categoryId
      })
      return filterData ? filterData : null
     
    })
    setDisplaySubCategory(sub)
    
 },[params, AllSubCategory])

  return (

    <section className="sticky  top-24 lg:top-20">
      <div className="container sticky  top-24 mx-auto grid grid-cols-[90px_1fr]  md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/** sidebar to display sub category */}
        <div className=" min-h-[96vh] max-h-[96vh] overflow-y-scroll grid gap-1 shadow-md  scrollbarCustom py-2  bg-white">
          {
            displaySubCategory.map((s, index) => {
              console.log("s",s._id)
              const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]._id}/${valideURLConvert(s.name)}-${s._id}`
              return (
                <Link to={link} className={`   ${subCategoryId === s._id ? "bg-green-100" :""} w-full  p-2 bg-white lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-200 cursor-pointer    `}>
                  <div  className="w-fit max-w-28 mx-auto lg:mx-0  bg-white rounded box-border">
                    <img
                      src={s.image}
                      alt="subCategory"
                      className="w-14 lg:w-12 lg:h-14 h-full object-scale-down"
                    />
                  </div>
                  <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">{s.name}</p>
                </Link>
              )
            })
          }




       </div>

        {/**Product  */}
        <div className="sticky top-20">
          
          <div className="bg-white shadow-md p-4 z-10  ">
            <h3 className="font-semibold">{subCategoryName }</h3>
          </div>

          <div>

            <div className="min-h-[88vh] max-h-[88vh] overflow-y-auto relative">
              
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-4 gap-4">
              {
                data.map((p,index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                    )
                  })
              }
       </div>

            </div>


            {
              loading && (
                <Loading/>
              )
            }
    </div>




        </div >
        

      </div>
    </section>
   
  )
}

export default ProductListPage
