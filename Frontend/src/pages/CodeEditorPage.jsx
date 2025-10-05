import React, { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import EditorSidebar from '../components/Editor/EditorSidebar'
import { useDispatch, useSelector } from 'react-redux'
import TopBar from '../components/Editor/TopBar'
import toast from 'react-hot-toast'
import { resetChangedFiles } from '../slices/editorSlice'
import { io } from 'socket.io-client'
import Spinner from '../components/common/Spinner'
import { setProject } from '../slices/projectSlice'
import { getProjectDetails } from '../services/operarions/projectApis'

const CodeEditorPage = () => {

    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 
    const {projectId} = useParams() ;
    const {changedFiles} = useSelector((state) => state.editor) ; 
    const {token} = useSelector((state) => state.auth) ; 
    // const {project} = useSelector((state) => state.project) ;
    const {user} = useSelector((state) => state.user) ;
    const [projectt , setProjectt] = useState(null) ; 

    const changedFilesRef = useRef(changedFiles);
    const projectRef = useRef(null);
    const socketRef = useRef(null);


    const handleLeaveRoom = () => {

        console.log("HANDLE LEAVE ROOM CALLED ??????????") ; 
        console.log("changed file before a user leaves" , changedFilesRef.currentFiles) ; 
        if (!socketRef.current || !projectId) return;
        const data = {
            projectId : projectId , 
            userId : user._id , 
            changedFiles : changedFilesRef.current , 
        }
        socketRef.current.emit('disconnect_from_room' , data , () => {

            socketRef.current?.disconnect();
        }) ; 

    }
    const newUserJoinHandler = (data) => {
        const {newUser ,project , newUserDetails} = data ; 
        console.log("USER JOINED") ;
        toast.success(`${newUser} Joined The Session`) ; 
        setProjectt(project) ;  
    }
    const userLeaveHandler = (data) => {
        const {newUser ,project , saved } = data ; 
        toast.success(`${newUser} has Left The Session`) ; 
        setProjectt(project) ;  
        if(saved) {
            toast.success("all files are saved") ; 
            dispatch(resetChangedFiles()) ; 
        }
    }


    useEffect(() => {
        changedFilesRef.current = changedFiles ;
    } ,[changedFiles] ) ;


    useEffect(() => {
        projectRef.current = projectt ;
    } ,[projectt?.activeUsers,projectt] ) ;

    useEffect(() => {
        if (!projectId) return;
        if (!user?._id) return;
        const fetchProjectDetails = async() => {
            const result = await getProjectDetails(projectId, token ) ; 
            if(result){
                const isMember = result?.members?.some(member => member?.user === user?._id )
                let isAdmin = (result?.admin.toString() === user?._id?.toString()) ; 
                
                if((  (!isMember ) && (!isAdmin )  )  ){
                    toast.error('Your Are Not Permitted in The Room');
                    navigate("/") ; 
                }
            }


        }
        fetchProjectDetails() ; 
        const socket  = io(process.env.REACT_APP_SOCKET_IO_BACKEND) ; 
        socketRef.current = socket ; 

        window.addEventListener('beforeunload',handleLeaveRoom );

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
            window.removeEventListener('beforeunload',handleLeaveRoom);
            handleLeaveRoom();
        }

    } ,[user , projectId] ) ;

    //for the projected route for members. 
    if (!projectt ) {
        return <Spinner />;
    }
    // {
    //     const isMember = project?.members?.some(member => member?.user === user?._id )
    //     let isAdmin = (project?.admin.toString() === user?._id?.toString()) ; 

    //     if(project  &&(  (!isMember ) && (!isAdmin )  )  ){
    //         toast.error('Your Are Not Permitted in The Room');
    //         return <Navigate to={'/'}/>
    //     }
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
                    <EditorSidebar socket ={socketRef?.current}/>
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
