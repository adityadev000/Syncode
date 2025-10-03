import React, { useEffect, useRef } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import EditorSidebar from '../components/Editor/EditorSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../slices/projectSlice'
import TopBar from '../components/Editor/TopBar'
import toast from 'react-hot-toast'
import { resetChangedFiles } from '../slices/editorSlice'
import { io } from 'socket.io-client'
import Spinner from '../components/common/Spinner'

const CodeEditorPage = () => {

    const dispatch = useDispatch() ; 
    const {projectId} = useParams() ;
    const {changedFiles} = useSelector((state) => state.editor) ; 
    const {project} = useSelector((state) => state.project) ;
    const {user} = useSelector((state) => state.user) ;

    const changedFilesRef = useRef(changedFiles);
    const projectRef = useRef(null);
    const socketRef = useRef(null);


    const handleLeaveRoom = () => {

        console.log("HANDLE LEAVE ROOM CALLED ??????????")
        const data = {
            projectId : projectId , 
            userId : user._id , 
            changedFiles : changedFiles , 
        }
        socketRef.current.emit('disconnect_from_room' , data) ; 
        setTimeout(() => {
            socketRef.current?.disconnect();
        }, 100);

    }
    const newUserJoinHandler = (data) => {
        const {newUser ,project , newUserDetails} = data ; 
        console.log("USER JOINED") ; 
        toast.success(`${newUser} Joined The Session`) ; 
        dispatch(setProject(project)) ; 
    }
    const userLeaveHandler = (data) => {
        const {newUser ,project , saved } = data ; 
        dispatch(setProject(project)) ; 
        toast.success(`${newUser} has Left The Session`) ; 
        if(saved) dispatch(resetChangedFiles()) ; 
    }


    useEffect(() => {
        changedFilesRef.current = changedFiles ;
    } ,[changedFiles] ) ;


    useEffect(() => {
        projectRef.current = project ;
    } ,[project?.activeUsers,project] ) ;

    useEffect(() => {
        const socket  = io(process.env.REACT_APP_SOCKET_IO_BACKEND) ; 
        socketRef.current = socket ; 

        window.addEventListener('beforeunload',handleLeaveRoom);

        socket.on('connect' , () => {
            console.log('Socket Io Connection Successful');
            const data = {
                projectId:projectId,
                userId:user._id,
            };
            socket.emit('connect_To_Room',data);
        })

        socket.on('connect_error',()=>{
            console.log('Some Error in cnnection');
        })

        socket.on('user-join-room',newUserJoinHandler);

        socket.on('user-leave-room',userLeaveHandler);

        socket.on("disconnect", () => {
            console.log('Socket Io Disconnected Successfully');
        });



        return () => {
            socket.off('user-join-room',newUserJoinHandler);
            socket.off('user-leave-room',userLeaveHandler);
            // socket.off('updateRoomPermissions',handlePermissionUpdate);
            handleLeaveRoom();
            window.removeEventListener('beforeunload',handleLeaveRoom);
        }

    } ,[user , projectId] ) ;

    //for the projected route for members. 
    if (!project) {
        return <Spinner />;
    }
    // if(project && (project.members?.filter(ele => ele.user._id === user._id)?.length===0) && ((project.admin?._id!==user._id))){

    //     toast.error('Your Are Not Permitted in The Room');
    //     return <Navigate to={'/'}/>
    // }

    return (
        <div className='flex flex-col justify-end w-screen min-h-[calc(100vh-3.5rem)]'>
            <div className='h-[3rem] border border-yellow-200'>
                <TopBar/>

            </div>
            <div className='flex  justify-end w-screen min-h-[calc(100vh-5.5rem)]'>
                <div
                    className={`h-screen hidden  md:block fixed top-[7.5rem] left-0 min-w-[300px]  border-r border-r-richblack-700 transition-all duration-300 z-20  px-3`}
                >
                    <EditorSidebar/>
                </div>
                <div
                    className='h-[calc(100vh-4rem)] w-full md:w-[calc(100vw-320px)] text-white py-8 pr-4'
                >
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default CodeEditorPage
