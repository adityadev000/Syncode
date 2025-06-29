import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye ,FiEyeOff} from "react-icons/fi";
import PasswordCondition from '../components/common/PasswordCondition';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operarions/authApis';
import { setSignupData } from '../slices/userSlice';

const Signup = () => {
    const {
        register,
        handleSubmit,
        reset , 
        formState: { errors , isSubmitSuccessful},
    } = useForm();
    const[Loading , setLaoding] = useState(false) ;
    const [visible , setVisible] = useState(false) ;
    const [visibleCnf, setVisibleCnf] = useState(false) ;
    const {signupData} = useSelector((state) => state.user) ; 
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() 

    const signUpHandler = async (data , event) => {
        event.preventDefault() ;
        console.log("SIGNUP DATA..." , signupData) ; 
        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLaoding(true) ; 

        const result = await sendOtp(data) ; 
        if(result != null ){
            dispatch(setSignupData(data)) ; 
            navigate("/verify-email") ; 
            toast.success("OTP sent successfully")
        }
        setLaoding(false) ; 
    };

    useEffect(() => {
        if(signupData === null ){
            reset() ; 
        }
    },[] ) 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
            <form
                onSubmit={handleSubmit(signUpHandler)}
                className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Syncode Account</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-300">First Name</label>
                    <input
                        type='text'
                        placeholder='Enter first name'
                        {...register('firstName', { required: true })}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">First name is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-300">Last Name</label>
                    <input
                        type='text'
                        placeholder='Enter last name'
                        {...register('lastName', { required: true })}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">Last name is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-300">Email</label>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        {...register('email', { required: true })}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-300">Password</label>
                    <div className=' relative '>
                        <input
                            type={visible ?  'text' : 'password'}
                            id="password"
                            placeholder='Enter your Password'
                            {...register("password" , {required : true } ) }
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                        />
                        <div onClick={() => visible ? setVisible(false) : setVisible(true) }
                            className=' absolute right-4 top-1/2 -translate-y-1/2 text-gray-300'
                        >
                            {
                                visible ? (<FiEyeOff fontSize={20} />) : (<FiEye fontSize={20} />)
                            }
                        </div>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm text-gray-300">Confirm Password</label>
                    <div className=' relative '>
                        <input
                            type={visibleCnf ?  'text' : 'password'}
                            id="password"
                            placeholder='Enter your Password'
                            {...register("confirmPassword" , {required : true } ) }
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                        />
                        <div onClick={() => visibleCnf ? setVisibleCnf(false) : setVisibleCnf(true) }
                            className=' absolute right-4 top-1/2 -translate-y-1/2 text-gray-300'
                        >
                            {
                                visibleCnf? (<FiEyeOff fontSize={20} />) : (<FiEye fontSize={20} />)
                            }
                        </div>
                    </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">Confirm your password</p>}
                </div>
                <div>
                    <PasswordCondition/>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 mt-3 rounded-md font-medium"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;