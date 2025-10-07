import React, { useEffect } from 'react'
import Spinner from '../components/common/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import {  setIsDashboardLoads } from '../slices/hamburgerSlice';
const Dashboard = () => {
    const {userLoading} = useSelector((state) => state.user) ; 
    const {dashBoardSideBar} = useSelector((state) => state.hamburger) ; 
    const dispatch = useDispatch() ; 
    useEffect(() => {
        dispatch(setIsDashboardLoads(true)) ; 
        return ()=> {
            dispatch(setIsDashboardLoads(false)); 
        }
    } ,[] ) 

    if(userLoading){
        return (
            <Spinner/>
        )
    }
    return(
        <div className='flex justify-end w-screen min-h-[calc(100vh-3.5rem)]relative'>
            <div
                className={`h-screen ${dashBoardSideBar ? 'block' : 'hidden' } fixed top-[3.5rem] left-0 min-w-[222px]  border-r border-r-richblack-700 transition-all duration-300 z-30 pt-5  bg-blue-800`}
            >
                <Sidebar/>
            </div>
            <div
                className={`min-h-[calc(100vh-4rem)]  ${dashBoardSideBar ? 'w-full md:w-[calc(100vw-252px)]  ' : 'w-full' }   text-white  relative z-10 overflow-y-auto`}
            >
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard
