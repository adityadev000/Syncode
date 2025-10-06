import React, { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import EditorSidebar from '../components/Editor/EditorSidebar'
import { useDispatch, useSelector } from 'react-redux'
import TopBar from '../components/Editor/TopBar'
import toast from 'react-hot-toast'
import { resetChangedFiles } from '../slices/editorSlice'
import { io } from 'socket.io-client'
import Spinner from '../components/common/Spinner'
import { getProjectDetails } from '../services/operarions/projectApis'
import {  setIsEditorLoads } from '../slices/hamburgerSlice'

const CodeEditorPage = () => {

    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 
    const {projectId} = useParams() ;
    const {changedFiles} = useSelector((state) => state.editor) ; 
    const {token} = useSelector((state) => state.auth) ; 
    const {user} = useSelector((state) => state.user) ;
    const {editorSideBar} = useSelector((state) => state.hamburger) ;
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
        if(project && project._id){
            toast.success(`${newUser} Joined The Session`) ; 
            setProjectt(project) ;  
        }
        else{
            toast.error("invalid project received") ; 
        }
    }
    const userLeaveHandler = (data ) => {
        const {newUser ,project , saved } = data ; 
        if(project && project._id){

            toast.success(`${newUser} has Left The Session`) ; 
            setProjectt(project) ;  
        }
        else{
            toast.error("invalid project received") ; 
        }
        if(saved) {
            toast.success("all files are saved") ; 
            dispatch(resetChangedFiles()) ; 
        }
    }

    useEffect(() => {
        dispatch(setIsEditorLoads(true)); 
        return () => {
            dispatch(setIsEditorLoads(false)); 
        }
    } ,[] )


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
    useEffect(() => {
        console.log("project in edior page " , projectt) ; 
    })
    if (!projectt ) {
        return <Spinner />;
    }   

    return (
        <div className='flex flex-col justify-end w-screen min-h-[calc(100vh-3.5rem)] overflow-y-auto'>
            <div className={`min-h-fit ${editorSideBar ? 'md:w-[calc(100vw-320px)] w-full md:ml-[320px] ml-0  hidden sm:block' : 'w-full ml-0' } fixed top-[3.5rem] left-0 px-2 md:px-6  z-20 overflow-y-auto bg-gray-800 rounded-md py-2`} >
                <TopBar socket={socketRef?.current}  userId={user._id} projectId={projectId} changedFiles={changedFilesRef.current} setProjectt={setProjectt} project={projectt}
                    editorSideBar={editorSideBar}
                />

            </div>
            <div className='flex  justify-end w-screen overflow-y-auto relative'>
                <div
                    className={`h-[calc(100vh-3.5rem)] ${editorSideBar ? 'block' : 'hidden'} fixed top-[3.5rem] left-0 min-w-[300px]  border-r border-r-richblack-700 transition-all duration-300 z-20  px-3 py-2 overflow-y-auto bg-gray-800 `}
                >
                    <EditorSidebar socket ={socketRef?.current}/>
                </div>
                <div
                    className={`h-[calc(100vh-9rem)] ${editorSideBar ? 'md:w-[calc(100vw-320px)] w-full mt-10'  : 'w-full'} text-white py-8 pr-4 z-10 `}
                >
                    
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default CodeEditorPage
