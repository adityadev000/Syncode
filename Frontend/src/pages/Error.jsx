import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/userSlice';
import toast from 'react-hot-toast';

const Error = () => {
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    const logout = ()=> {
        dispatch(setToken(null)) ; 
        dispatch(setUser(null)) ; 
        toast.success("Logged out") ; 
        navigate("/") ; 
    }
    return (
        <div className=' w-full h-screen flex justify-center items-center'>
            <button onClick={logout}>LogOut</button>
        </div>
    )
}

export default Error
