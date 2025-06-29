import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiEye ,FiEyeOff} from "react-icons/fi";
import { login } from '../services/operarions/authApis';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/authSlice'
import { setUser } from '../slices/userSlice'

const LoginPage = () => {

    const [loading ,setLoading] = useState(false) ; 
    const [visible , setVisible] = useState(false) ; 

    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 

    const {
        register , 
        handleSubmit , 
        reset,  
        formState : {errors , isSubmitSuccessful} 
    } = useForm() ; 

    const loginHandler = async(data , event ) => {

        try{
            event.preventDefault() ;
            setLoading(true) ;
            const result = await login(data) ; 

            if(result !== null ){
                dispatch(setToken(reset.token)) ; 
                dispatch(setUser(result)) ; 
                navigate("/dashboard/my-profile")
            }
        }
        catch(err){
            console.error(err) ; 
        }

        setLoading(false) ; 
    }
    useEffect(() => {
        if(isSubmitSuccessful){
            reset() ; 
        }
    } , [isSubmitSuccessful , reset ] )
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
            <form onSubmit={handleSubmit(loginHandler)} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Syncode</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 text-sm text-gray-300">Email</label>
                    <input
                        type="email"
                        placeholder='Enter your Email'
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-blue-500"
                        {...register("email", {required : true })}
                    />
                    {
                        errors.email&& (
                            <span className=' text-xs text-rose-500'>Please enter your email**</span>
                        )
                    }
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 text-sm text-gray-300">Password</label>
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
                    {
                        errors.password&& (
                            <span className=' text-xs text-rose-500'>Please enter your password**</span>
                        )
                    }
                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-md font-medium"
                >
                    Login
                </button>
            </form>
            <div className=' flex gap-5'>
                <Link  className=' hover:text-blue-400 transition-all duration-200'>Forgot Password? </Link>
                <Link to='/signup' className=' hover:text-blue-400 transition-all duration-200'>Create Account </Link>
            </div>
        </div>
    );
};

export default LoginPage;
