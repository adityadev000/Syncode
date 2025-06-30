import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Spinner from '../components/common/Spinner' ; 
import PasswordCondition from '../components/common/PasswordCondition' ; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { resetPassword } from '../services/operarions/authApis';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
    const [loading , setLoading] = useState(false) ; 
    const [visible , setVisible] = useState(false) ;
    const [visibleCnf, setVisibleCnf] = useState(false) ;
    const {register , handleSubmit , formState : {errors} }  = useForm() ; 
    const {token}= useParams() ; 
    const navigate = useNavigate() ; 

    const submitHandler = async(data) =>{
        setLoading(true) ; 
        if(data.password !== data.confirmPassword){
            toast.error("Password and confirmPassword must be same") ; 
            setLoading(false) ; 
            return ; 
        }
        const updatedData = {...data , token} ; 
        console.log("UPDATED DATA..." , updatedData) ; 
        const result = await resetPassword(updatedData) ; 
        if(result !== null ){
            navigate("/login" ) ; 
        }
        setLoading(false) ; 
    } 

    return (
        loading ? (<Spinner/>) : (
            <div className=" w-screen  h-screen bg-gray-900 flex justify-center items-center text-white">
            <div className=' flex flex-col min-w-[320px]  w-[40%] my-auto'>

                <p className=" text-3xl">Choose new password</p>
                <p className=' mt-1 text-richblack-100'>Almost done. Enter your new password and you are all set.</p>
                <form className=' mt-10 flex flex-col items-center'
                onSubmit={handleSubmit(submitHandler)}>
                    <div className=" flex flex-col gap-6 w-full justify-center items-center ">

                        <label className="flex flex-col gap-2 w-full justify-center  ">
                            <p>
                                New Password <sup className="text-red-600">*</sup>
                            </p>
                            <div className="relative">
                                <input
                                    required
                                    type={visible ? "text" : "password"}
                                    placeholder="Enter Password"
                                    {...register("password" , {required : true })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                                {
                                    errors.password && (
                                        <span className=' text-xs text-rose-500'>Please enter Password**</span>
                                    )
                                }
                                <div
                                    onClick={()=> visible ? setVisible(false) : setVisible(true) }
                                    className=" absolute right-3 top-[50%] -translate-y-[50%]"
                                >
                                {visible ? (
                                <FiEyeOff fontSize={20} />
                                ) : (
                                <FiEye fontSize={20} />
                                )}
                            </div>
                            </div>
                        </label>

                        <label className="flex flex-col gap-2 w-full  justify-center  ">
                            <p>
                                Confirm new Password <sup className="text-red-600">*</sup>
                            </p>
                            <div className="relative">
                                <input
                                    type={visibleCnf ? "text" : "password"}
                                    placeholder="Enter confirm Password"
                                    {...register("confirmPassword" , {required : true })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                                />
                                {
                                    errors.confirmPassword && (
                                        <span className=' text-xs text-rose-500'>Please enter Password**</span>
                                    )
                                }
                                <div
                                    onClick={()=> visibleCnf ? setVisibleCnf(false) : setVisibleCnf(true) }
                                    className=" absolute right-3 top-[50%] -translate-y-[50%]"
                                >
                                    {visibleCnf ? (
                                    <FiEyeOff fontSize={20} />
                                    ) : (
                                    <FiEye fontSize={20} />
                                    )}
                                </div>
                            </div>
                        </label>
                        <PasswordCondition customclass="text-lg"/>
                        
                    </div>
                    <button className='text-center text-[16px] bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-medium  w-full mt-4  '>
                        Reset Password
                    </button>

                </form>
                <div className='flex  text-white  mt-8  justify-start w-[78%]'>
                    <Link to={"/login"} className=' flex items-center gap-2 text-base justify-start hover:text-blue-400 transition-all duration-200'>
                        <FaArrowLeft />
                        <p>Back to Login</p>
                    </Link>
                </div>
            </div>
                
            </div>

        )
    )
}

export default UpdatePassword
