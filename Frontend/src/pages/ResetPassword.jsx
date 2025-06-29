import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { resetPasswordToken } from '../services/operarions/authApis';
import Spinner from '../components/common/Spinner';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
    const[loading , setLoading] = useState(false) ; 
    const[sent , setSent] = useState(null) ; 
    const {register ,watch ,  handleSubmit , formState : {errors} } = useForm() ; 

    const submitHandler = async(data ) => {
        setLoading(true) ; 
        const updatedData = sent !== null ? sent : data ; 
        const result = await resetPasswordToken(updatedData) ;
        if(result !== null ){
            const emailData = {
                email : data.email 
            }
            setSent(emailData) ; 
        }
        setLoading(false) ; 
    }
    return (
        loading ? (<div className='h-screen w-screen flex justify-center items-center  bg-richblack-900'><Spinner/></div>) 
        : 
        (
            sent ? (
            <div className=' w-screen h-screen bg-gray-900 flex justify-center items-center'>
                <div className=' min-w-[320px] w-[40%] h-[60%] flex gap-5 flex-col'>
                    <p className=' text-white text-3xl font-semibold'>check Email</p>
                    <p className=' text-richblack-100 text-xl'>We have sent the reset email to {watch("email")} 

                    </p>
                    <button className='w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-medium'
                    onClick={submitHandler}>
                        Resend Email
                    </button>

                    <div className='flex justify-between text-white '>
                        <Link to={"/login"} className=' flex items-center gap-2 text-base hover:text-blue-400 transition-all duration-200'>
                            <FaArrowLeft />
                            <p>Back to Login</p>
                        </Link>
                    </div>

                </div>
            </div>) : (
                <div className=' w-screen h-screen bg-gray-900 flex justify-center items-center'>
                    <div className=' min-w-[320px] w-[40%] h-[60%] flex gap-5 flex-col'>
                        <p className=' text-white text-3xl font-semibold'>Reset your password</p>
                        <p className=' text-richblack-100 text-xl'>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery

                        </p>
                        <form className="flex flex-col gap-5"
                            onSubmit={handleSubmit(submitHandler)}
                        >
                            <label className=' flex flex-col gap-2 mt-1 '>
                                <p className="text-white">
                                    Email Address <sup className='text-red-600 text-base'>*</sup>
                                </p>
                                <input
                                    type="email"
                                    placeholder="Enter Email address"
                                    {...register("email" , {required : true })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none"
                                />
                                {
                                    errors.email && (
                                <span className=' text-xs text-rose-500'>Please enter email*</span>
                            )
                                }
                            </label>
                            
                            <button className='text-center text-[16px] bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-medium  w-full '>
                                Submit
                            </button>
                        </form>

                        <div className='flex justify-between text-white '>
                            <Link to={"/login"} className=' flex items-center gap-2 text-base hover:text-blue-400 transition-all duration-200'>
                                <FaArrowLeft />
                                <p >Back to Login</p>
                            </Link>
                        </div>

                    </div>

            </div>)
        )
    )
}

export default ResetPassword
