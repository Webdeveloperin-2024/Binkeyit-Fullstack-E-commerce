import React,{useState,useEffect} from 'react'
import UploadCategoryModel from "../components/UploadCategoryModel"
import NoData from "../components/NoData"
import Loading from "../components/Loading"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from "react-hot-toast"
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const CategoryPage = () => {

    const [openUploadCategory, setOpenUploadCategroy] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState({
        name: "",
        image:""
    })

    const [openConfirmBoxDelete,setOpenConfirmBoxDelete]=useState(false)
    const [deleteCategory, setDeleteCategory] = useState({
        _id:""
    })

    const allCategory = useSelector(state => state.product.allCategory)
    console.log("all category redux",allCategory)
    
    
    useEffect(() => {
        setCategoryData(allCategory)
    },[allCategory])





    const handleDeleteCategory = async () => {
        
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data:deleteCategory
            })

            const { data: responseData } = response
            
            if (responseData.success) {
                toast.success(responseData.message)
                
                setOpenConfirmBoxDelete(false)
            }


        } catch (error) {
            AxiosToastError(error)
        }
    
}
    
  return (
  
      <section>
          <div  className="p-2  bg-white  shadow-md flex items-center justify-between">
              <h2 className="font-semibold">Category</h2>
              <button  onClick={()=>setOpenUploadCategroy(true)} className="text-sm border border-amber-300
               hover:border-amber-400 px-3 py-1 rounded cursor-pointer">Add Category</button>
          </div>

          {
              !categoryData[0] && !loading && (
                  <NoData/>
              )
          }

          <div  className="p-4  grid grid-cols-2  md:grid-cols-4 lg:grid-cols-5  gap-2">
              
          {
              categoryData.map((category,index) => {
                  return (
                      <div className="w-32 h-56  bg-[#edf4ff]   rounded shadow-md" key={category._id}>
                          <img
                              alt={category.name}
                              src={category.image}
                              className="w-full object-scale-down"
                          />
                          <div className="flex items-center h-9 gap-2">
                              <button onClick={() => {
                                  setOpenEdit(true)
                                  setEditData(category)
                              }} className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded cursor-pointer">
                                  Edit
                              </button>
                              <button onClick={() => {
                                  setOpenConfirmBoxDelete(true)
                                  setDeleteCategory(category)
                              } } className="flex-1  bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded cursor-pointer">
                                  Delete
                              </button>
                          </div>
                      </div>
                  )
              })
          }
          

</div>



          {
              loading && (
                  <Loading/>
              )
        }

          {
              openUploadCategory && (
                  < UploadCategoryModel fetchData={fetchCategory }  close={()=>setOpenUploadCategroy(false) } />
              )
        }
          
          
          {
              openEdit && (
                  <EditCategory
                      data={editData}
                      close={() => setOpenEdit(false)}
                      fetchData={fetchCategory} />
              )
        }

          
          {
              openConfirmBoxDelete && (
                  <ConfirmBox close={() => { setOpenConfirmBoxDelete(false) }} cancel={()=> setOpenConfirmBoxDelete(false) }   confirm={handleDeleteCategory } />
              )
          }

      </section>
      
      
      
  )
}

export default CategoryPage
