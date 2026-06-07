import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/userSlice';
import toast from 'react-hot-toast';

const Error = () => {
    return (
        <div className=' w-full h-screen flex justify-center items-center text-4xl'>
            404 Forbidden
        </div>
    )
}

export default Error
