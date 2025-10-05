import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { GoProjectSymlink } from 'react-icons/go'
import { LuLogOut } from 'react-icons/lu'
import { VscProject } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { setToken } from '../../slices/authSlice'
import { setUser } from '../../slices/userSlice'
import toast from 'react-hot-toast'
import ConfirmationModal from '../common/ConfirmationModal'
import LogoutModal from '../common/LogoutModal'

const Sidebar = () => {
    const [confirmationModal , setConfirmationModal] = useState(null) ;
    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;
    const location = useLocation() ; 

    const logout = ()=> {
        dispatch(setToken(null)) ; 
        dispatch(setUser(null)) ; 
        toast.success("Logged out") ; 
        navigate("/") ; 
    }

    const matchRoute = (route)=>{
        return matchPath({path : route} , location.pathname) ; 
    }

    return (
        <div>
            <div className=' flex flex-col gap-1'>
                <NavLink
                    to='/dashboard/my-profile'
                    className={`flex gap-2 items-center px-8 py-2 text-base font-medium${matchRoute('/dashboard/my-profile') ? ' bg-blue-800 text-blue-100 font-semibold text-base' : ' bg-opacity-0 text-richblack-200'}`}
                >
                    <CgProfile />
                    <span>My Profile</span>
                </NavLink>


                <NavLink
                    to='/dashboard/my-projects'
                    className={`flex gap-2 items-center px-8 py-2 text-base font-medium${matchRoute('/dashboard/my-projects') ? ' bg-blue-800 text-blue-100 font-semibold text-base' : ' bg-opacity-0 text-richblack-200'}`}
                >
                    <GoProjectSymlink />
                    <span>My Projects</span>
                </NavLink>


                <NavLink
                    to='/dashboard/projects-collab'
                    className={`flex gap-2 items-center px-8 py-2 text-base font-medium${matchRoute('/dashboard/projects-collab') ? ' bg-blue-800 text-blue-100 font-semibold text-base' : ' bg-opacity-0 text-richblack-200'}`}
                >
                    <VscProject />
                    <span>Projects Collaborated</span>
                </NavLink>

                <button
                    className={`flex gap-2 items-center px-8 py-2 text-base font-medium text-richblack-200`}
                    onClick={() => {
                        setConfirmationModal({
                            text1 : 'Are you sure ? ',
                            text2 : 'You will be logged out of your Account',
                            btn1Text : "Logout",
                            btn2Text : 'Cancel',
                            btn1Handler : logout , 
                            btn2Handler : () => {
                                setConfirmationModal(null) ; 
                            } 
                        })
                    }}
                >
                    <LuLogOut />
                    <p>Logout</p>
                </button>
            </div>
            {
                confirmationModal && (<LogoutModal modalData ={confirmationModal} />)
            }
        </div>
    )
}

export default Sidebar
