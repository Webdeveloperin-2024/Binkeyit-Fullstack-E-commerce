
import React,{useState} from 'react'
import {useSelector}from "react-redux"
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from '../utils/AxiosToastError';
import toast from "react-hot-toast"
import {useGlobalContext} from "../provider/GlobalProvider"

const Address = () => {

  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const {fetchAddress}= useGlobalContext()

  const handleDisableAddress = async (id) => {

  try {
    const response = await Axios({
      ...SummaryApi.disableAddress,
      data: {
        _id : id
      }
    })
    if (response.data.success) {
      toast.success("Address Remove")
      if (fetchAddress) {
        fetchAddress()
      }
    }

  } catch (error) {
    AxiosToastError(error)
  }
}



  return (
    <div>
      <div className="bg-white shadow-lg px-2 py-2 flex gap-4 justify-between items-center">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button onClick={() => setOpenAddress(true)}    className="border border-amber-400 text-amber-400 px-3 py-1 rounded-full hover:bg-amber-400 hover:text-black cursor-pointer">
    Add Address
        </button>
      </div>

        <div className="bg-blue-50 p-2 grid gap-4">
                        {
          addressList.map((address, index) => {
                              
                                return (
                                    
                                  
                                    <div className={`flex gap-3 border rounded p-3 bg-white ${!address.status && "hidden"}`}>
                                   

                                        <div className="w-full">
                                        <p>{address.address_line}</p>
                                        <p>{address.city}</p>
                                        <p>{address.state}</p>
                                        <p>{address.country}- {address.pincode }</p>
                                        <p>{address.mobile }</p>
                                        </div>
                                    <div className="grid gap-10">
                                      <button onClick={() => {
                                        setOpenEdit(true)
                                        setEditData(address)
                                      }} className="bg-green-200 p-1 rounded hover:text-white  hover:bg-green-600 cursor-pointer">
                                         <MdEdit  />
                                      </button>
                                     
                                      <button onClick={()=> handleDisableAddress(address._id)} className="bg-red-200 p-1 cursor-pointer rounded hover:bg-red-600 hover:text-white">
                                        <MdDelete size={20} />
                                      </button>
                                    
                                       </div>
                                    
                                        </div>
                                        
                                )
                            })
                        }
                     <div onClick={() => setOpenAddress(true)} className="h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center cursor-pointer">
                    Add address
                    </div>

                   </div>
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
          )
      }
      {
        openEdit && (
          <EditAddressDetails close={()=> setOpenEdit(false)} data={editData} />
        )
      }


    </div>
  )
}

export default Address
