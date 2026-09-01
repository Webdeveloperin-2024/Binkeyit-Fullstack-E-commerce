import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { IoEyeOffOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
    const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword,setShowConfirmPassword] = useState(false)


  const valideValue = Object.values(data).every((el) => el);

  console.log("resetPassword", location);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  console.log("data reset password", data);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      
      //optional
      if (data.newPassword !== data.confirmPassword) {
          toast.error("New password and confirm password must be same")
      }
    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });
      console.log("response", response);

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login")
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg ">Enter Your New Password</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-amber-400">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                autoFocus
                name="newPassword"
                className="w-full outline-none"
                placeholder="Enter your new password"
              />

              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <LuEye /> : <IoEyeOffOutline />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword"> Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-amber-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                autoFocus
                name="confirmPassword"
                className="w-full outline-none"
                placeholder="Enter your confirm password"
              />

              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <LuEye /> : <IoEyeOffOutline />}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={`${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white 
                    py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p>
          Already have an account ?
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
