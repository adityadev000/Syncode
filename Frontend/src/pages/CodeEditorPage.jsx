import React, { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import EditorSidebar from '../components/Editor/EditorSidebar'
import { addActiveUsers, removeActiveUsers, saveAllFile } from '../services/operarions/projectApis'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../slices/projectSlice'
import TopBar from '../components/Editor/TopBar'
import toast from 'react-hot-toast'
import { resetChangedFiles } from '../slices/editorSlice'

const CodeEditorPage = () => {

    const dispatch = useDispatch() ; 
    const {projectId} = useParams() ;
    const {token} = useSelector((state) => state.auth ) ; 
    const {changedFiles} = useSelector((state) => state.editor) ; 
    const {project} = useSelector((state) => state.project) ;
    const {user} = useSelector((state) => state.user) ;
    const navigate = useNavigate() ; 

    useEffect(() => {

        const onMount = async() => {                
                
                const response = await addActiveUsers(token , projectId ); 
                if(response){
                    //dispatch updated project
                    dispatch(setProject(response) ) ; 
                    
                }
        }

        const onUnMount = async() => {

            const response = await removeActiveUsers(token , projectId ); 
            if(response){
                //dispatch updated project
                dispatch(setProject(response) ) ; 

                if(response.activeUsers.length === 0 ){
                    console.log("ALL users are disconnected ") ;
                    console.log("changed files " , changedFiles ) ; 
                    const result = await saveAllFile(changedFiles , token ) ; 

                    if(result){
                        toast.success("fileSaved") ; 
                        dispatch(resetChangedFiles()) ; 
                    }
                }
            }
        }

        onMount() ; 

        return ()=> {

                (async() => {
                    await onUnMount().catch(err => console.error(err)); 
                })() ; 
        };
    } ,[] ) ; 

    useEffect(() => {
        // if((project?.admin !== user._id) && (!project?.members.includes(user._id)) ) {
        //     navigate("/") ; 
        // }
    },[]) 
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
