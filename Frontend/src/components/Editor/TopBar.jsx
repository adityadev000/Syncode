import React, { useEffect, useReducer, useRef, useState } from 'react'
import InviteForm from './InviteForm';
import { useDispatch, useSelector } from 'react-redux';
import { GoDotFill } from 'react-icons/go';
import { IoIosShareAlt, IoMdExit } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { resetChangedFiles } from '../../slices/editorSlice';
import toast from 'react-hot-toast';
import { FaCaretSquareLeft } from 'react-icons/fa';
import RightBar from './RightBar';
import { setEditorSideBar } from '../../slices/hamburgerSlice';


const TopBar = ({socket , projectId , userId , changedFiles,setProjectt,project ,editorSideBar}) => {

    const [btn , setBtn] = useState(false) ;
    const [rightBar , setRightBar] = useState(false) ; 
    // const {isfileSynced} = useSelector((state) => state.editor) ;  
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 

    const inviteHandler = ()=>{
        setBtn(true) ; 
    }

    const RightBarHandler = () => {
        rightBar ? setRightBar(false) : setRightBar(true) ; 
    }
    const handleLeaveRoom = () => {
        const data = {
            projectId : projectId , 
            userId : userId , 
            changedFiles : changedFiles , 
        }
        socket.emit('disconnect_from_room' , data , () => {
            socket.disconnect();
        }) ; 
        navigate("/dashboard/my-profile") ;
        
    }
    const userLeaveHandler = (data ) => { 
        const {newUser ,project , saved } = data ; 
        toast.success(`${newUser} has Left The Session`) ; 
        setProjectt(project) ;  
        if(saved) {
            toast.success("all files are saved") ; 
            dispatch(resetChangedFiles()) ; 
        }
        
    }
    useEffect(() => {
        socket.on('user-leave-room',userLeaveHandler); 
    } ,[userId , projectId ])
    return (
        <div className='flex flex-wrap gap-2 md:gap-8 items-center justify-between md:justify-end mt-1 bg-gray-800'>
            <button class="hidden  relative sm:inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="flex  items-center  gap-1 relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent" onClick={() => {editorSideBar ? dispatch(setEditorSideBar(false)) : dispatch(setEditorSideBar(true)) } }>
                {editorSideBar ? 'Hide' : 'Show'} Sidebar
                </span>
            </button>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="flex  items-center  gap-1 relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent font-bold" onClick={inviteHandler}>
                    <p>Invite</p>
                    <IoIosShareAlt />
                </span>
            </button>

            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="flex items-center gap-1 relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent font-bold" onClick={handleLeaveRoom}>
                    Leave
                <IoMdExit />
                </span>
            </button>
            
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                <span className="flex items-center gap-1 relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent font-bold" onClick={RightBarHandler}>
                    <FaCaretSquareLeft />
                    <p>Active Users</p>
                </span>
            </button>

            {
                btn && (<InviteForm setBtn= {setBtn} />)
            }
            {
                rightBar && (<RightBar project={project}/>)
            }
        </div>
    )
}

export default TopBar
