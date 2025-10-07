import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FaClockRotateLeft } from 'react-icons/fa6';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSignupData } from '../slices/userSlice';
import { sendOtp, signup } from '../services/operarions/authApis';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
    const [loading, setLaoding] = useState(false);
    const [otp, setOtp] = useState('');
    const {signupData} = useSelector((state) => state.user) ;
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ;

    const handleVerify = async(e) => {
        if(loading) {
            return ; 
        }
        setLaoding(true) ; 
        e.preventDefault();

        const updatedSignupData = { ...signupData, otp };

        const result = await signup(updatedSignupData) ; 

        if(result !== null ){
            dispatch(setSignupData(null) ) ; 
            navigate("/login") ; 
            setLaoding(false) ; 
        }
    };
    const resendEmailHandler = async(event) => {
        if(loading){
            return ;
        }
        event.preventDefault() ;
        setLaoding(true) ; 

        const result = await sendOtp(signupData) ; 
        if(result != null ){
            toast.success("OTP sent successfully")
        }
        setLaoding(false) ; 
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4 ">
        <form
            onSubmit={handleVerify}
            className=" flex flex-col gap-5 bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center"
        >
            <h2 className="text-2xl font-bold ">Verify Your Email</h2>
            <p className="text-gray-400 ">Enter the 4-digit code sent to your email.</p>

            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                shouldAutoFocus
                separator={<span>-</span>}
                renderInput={(props) => <input {...props} 
                    className='h-8 !w-8   lg:h-14 mx-auto lg:!w-14 bbg-gray-800 rounded-lg border-b-[1px] text-richblack-900 font-semibold text-lg placeholder:text-center text-center focus:outline-none  bg-richblue-100'
                />}
            />
        

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-medium"
            >
                Verify
            </button>
        </form>
        <div className='flex justify-between text-white w-full max-w-md px-8'>
            <Link to={"/signup"} className=' flex items-center gap-2 text-base'>
                <FaArrowLeft />
                <p>Back to Signup</p>
            </Link>

            <div className=' flex  items-center gap-2 text-blue-100'
                onClick={resendEmailHandler}
            >   
                <div className="flex gap-2 items-center cursor-pointer">

                    <FaClockRotateLeft />
                    <p className="text-lg">Resend it</p>
                </div>
            
            </div>
        </div>

        </div>
    );
};

export default VerifyEmail;
