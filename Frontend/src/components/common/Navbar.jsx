import React from 'react';
import LogoName from '../../assets/Syncode_logo_Name.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const {token} = useSelector((state) => state.auth) ; 
    const {user} = useSelector((state) => state.user) ; 

    return (
        <nav className="bg-gray-950 text-white w-full px-6 py-3 flex justify-between items-center shadow-md fixed top-0 z-50 bg-gray-900 border-b border-b-richblack-600">
        {/* Logo */}
            <div className="text-xl font-bold">
                {/* <span className="text-blue-500">Syn</span>code */}
                <Link to='/'>
                    <img src={LogoName} className=' h-7'/>
                </Link>
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
                    <img src={user.avtarUrl} className='h-7'/>
                </div>
                )
            }
        </nav>
    );
};

export default Navbar;