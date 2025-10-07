import React, { useEffect, useState } from 'react';
import LogoName from '../../assets/Syncode_logo_Name.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropDown from '../dashboard/ProfileDropdown';
import { setDashBoardSideBar, setEditorSideBar } from '../../slices/hamburgerSlice';
import { RxHamburgerMenu } from 'react-icons/rx';
import { LuFileBox } from 'react-icons/lu';

const Navbar = () => {

    const {token} = useSelector((state) => state.auth) ; 
    const {isEditorLoads ,isDashboardLoads , dashBoardSideBar ,editorSideBar } = useSelector((state) => state.hamburger)

    const dispatch = useDispatch() ; 

    return (
        <nav className="bg-gray-950 text-white w-full px-6 py-3 flex justify-between items-center shadow-md fixed top-0 z-30 bg-gray-900 border-b border-b-richblack-600">
        {/* Logo */}
            <div className=' flex gap-3 items-center'>

                {
                    isEditorLoads  && (<LuFileBox className={`font-extrabold text-xl ${editorSideBar ? ' text-blue-200' : ' text-white'} `} onClick={() => {editorSideBar ? dispatch(setEditorSideBar(false)) : dispatch(setEditorSideBar(true)) }}/>)
                }
                {
                    isDashboardLoads  && (<RxHamburgerMenu className={`${dashBoardSideBar ? 'text-blue-200' : 'text-white'}`} onClick={() => {
                        dashBoardSideBar ? dispatch(setDashBoardSideBar(false)) : dispatch(setDashBoardSideBar(true)) ; 
                    }} />)
                }
                <div className="text-xl font-bold">
                    {/* <span className="text-blue-500">Syn</span>code */}
                    <Link to='/'>
                        <img src={LogoName} className=' h-7'/>
                    </Link>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-6">
                <Link to='/' className="hover:text-blue-400 transition">Home</Link>
                <a href='#features' className="hover:text-blue-400 transition" >Features</a>
                <a href='#howItWorks' className="hover:text-blue-400 transition">How It Works</a>
                <a className="hover:text-blue-400 transition">Contact</a>
            </div>

            {/* Call-to-Action */}
            {
                !token ? (

                <div className="flex gap-2">
                    <Link to='/signup' className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-sm font-medium">
                        Start Coding
                    </Link>
                    <Link to='/login' className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium">
                        Login
                    </Link>
                </div>
                ) : (
                <div>
                    <ProfileDropDown/>
                </div>
                )
            }
        </nav>
    );
};

export default Navbar;