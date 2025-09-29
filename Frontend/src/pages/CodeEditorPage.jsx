import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import EditorSidebar from '../components/Editor/EditorSidebar'
import { addActiveUsers, removeActiveUsers } from '../services/operarions/projectApis'
import { useDispatch, useSelector } from 'react-redux'
import { setProject } from '../slices/projectSlice'
import TopBar from '../components/Editor/TopBar'

const CodeEditorPage = () => {

    const dispatch = useDispatch() ; 
    const {projectId} = useParams() ;
    const {token} = useSelector((state) => state.auth ) ; 

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
                    // write here save all file logic by backend call
                }
            }
        }

        onMount() ; 

        return ()=> {
            onUnMount().catch(err => console.error(err)); ; 
        };
    } ,[] ) ; 
    return (
        <div className='flex flex-col justify-end w-screen min-h-[calc(100vh-3.5rem)]'>
            <div>
                <TopBar/>
            </div>
            <div className='flex  justify-end w-screen min-h-[calc(100vh-5.5rem)]'>
                <div
                    className={`h-screen hidden  md:block fixed top-[3.5rem] left-0 min-w-[300px]  border-r border-r-richblack-700 transition-all duration-300 z-20 pt-5 px-3`}
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
