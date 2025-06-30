import React from 'react'
import Spinner from '../components/common/Spinner'
import { useSelector } from 'react-redux'
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
    const {userLoading} = useSelector((state) => state.user) ; 

    if(userLoading){
        return (
            <Spinner/>
        )
    }
    return(
        <div className='flex justify-end w-screen min-h-[calc(100vh-3.5rem)]'>
            <div
                className={`h-screen hidden  md:block fixed top-[3.5rem] left-0 min-w-[222px]  border-r border-r-richblack-700 transition-all duration-300 z-20 pt-5`}
            >
                <Sidebar/>
            </div>
            <div
                className='h-[calc(100vh-4rem)] w-full md:w-[calc(100vw-252px)] text-white  px-5 sm:px-12 py-8 '
            >
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard
