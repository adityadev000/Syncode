import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import Operations from './Operations'
import { getProjectDetails } from '../../services/operarions/projectApis';
import { useDispatch, useSelector } from 'react-redux';
import {setProject, setProjectLoading} from '../../slices/projectSlice'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import {setActiveObject} from '../../slices/editorSlice' ; 

const EditorSidebar = () => {

    const {projectId , folderId} = useParams() ; 
    const {project , projectLoading} = useSelector((state) => state.project) ; 
    const {token} = useSelector((state) => state.auth ) ; 
    const [rootF , setRoot] = useState(null ); 
    const[loading , setLoading] = useState(true) ; 
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 

    useEffect(() => {

        async function fetchProjectDetails() {
            setLoading(true) ; 
            const result = await getProjectDetails(projectId , token ) ; 

            if(result){
                dispatch(setProject(result)) 
                
                const rootFolders = result?.folders.length > 0 ?  result?.folders.filter(item => item?.parentFolderDirectory === 'root') : null  ; 
                const rootFiles = result?.files.length > 0 ? result?.files.filter(item => item?.parentFolderDirectory === 'root') : null  ; 

                const data = {
                    rootFolders , 
                    rootFiles , 
                }

                setRoot(data) ; 

            }

            dispatch(setProjectLoading(false)) ; 
            setLoading(false) ; 
        }
console.log("dependencies changed. rerender " ) ; 

        fetchProjectDetails() ; 

    },[projectId , projectLoading] ) ; 

    const onFileClick = (file) => {
        console.log("this file clcicked " , file) ; 
        if(file.parentFolderDirectory === "root") {
            console.log("root file ") ; 
            navigate(`/project/${projectId}/file/${file._id}`)
        }
        else{
            dispatch(setActiveObject(file)) ; 
            navigate(`/project/${projectId}/folder/${file.parentFolder}/file/${file._id}`) ; 
        } 
    }
    if(loading){
        return (
            <div>Loading...</div>
        )

    }
    if(project == null ){
        return (
            <div>no file found</div>
        )
    }
    return (
        <div>
            <div className='flex gap-2 '>

                <div className='group flex gap-2'>

                    <div className=' uppercase cursor-pointer'>{project.name}</div>
                    <div className=' opacity-0 group-hover:opacity-100'>

                        <Operations file={true} folder={true} deletee={false} path="root" name={project.name} project={project} type='Project'/>
                    </div>
                </div>

            </div>

            <div>
                {
                    rootF?.rootFolders?.map((item) => (
                        <div key={item._id}>
                            <div>
                                <FolderView node={item} onFileClick = {onFileClick}/>
                            </div> 
                        </div>
                    ))
                }
                {
                    rootF?.rootFiles?.map((item) => (
                        <div key={item._id}>
                            <FolderView node={item} onFileClick = {onFileClick}/>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

const FolderView = ({node, onFileClick }) => {
    const [open , setOpen] = useState(true) ;  
    const navigate = useNavigate() ; 
    const {projectId } = useParams() ; 
    const {project } = useSelector((state) => state.project) ; 
    return (
        <div className=' pl-2'>
            {
                node.type === 'Folder' ?(
                    <div>

                        <div className='flex gap-2 items-center group' onClick={() => {
                                if(open){
                                    setOpen(false) ; 
                                }
                                else{
                                    setOpen(true) ; 
                                }
                                    navigate(`/project/${projectId}/folder/${node._id}`) ; 
                            
                            } }>
                            <div className='flex gap-2 items-center'  >
                                <div className=' text-3xl -mr-3 '>
                                    {
                                        !open ? <IoMdArrowDropdown className='text-3xl'/> : <IoMdArrowDropup className='text-3xl' />
                                    }
                                </div>
                                <div className='cursor-pointer'>

                                    {node.name}
                                </div>
                            </div>
                            <div className=' opacity-0 group-hover:opacity-100' onClick={() => {if(!open) {setOpen(true) ;  navigate(`/project/${projectId}/folder/${node._id}`) ; } }} >
                                <Operations file={true} folder={true} deletee={true} path={node.path} name={node.name} project={project} type='Folder' />
                            </div>
                        </div>
                        {open && (
                                <div>
                                {/* sort alphabetically */}
                                    {
                                        node?.folders?.map((child) => (
                                            <FolderView key={child._id} node={child} onFileClick={onFileClick}/>
                                        ))
                                    }
                                    {
                                        node?.files?.map((child) => (
                                            <FolderView key={child._id} node= {child} onFileClick={onFileClick}/>
                                        ))
                                    }
                                </div>
                        )}
                    </div>
                ) : (
                        <div onClick={() => onFileClick(node)} className=' group flex items-center pl-6 cursor-pointer'>
                            {node.name}
                            <div className=' opacity-0 group-hover:opacity-100'>
                                <Operations file={false} folder={false}  deletee={true} path={node.path} name={node.name} project={project} type='File' />
                            </div>
                        </div>
                )
            }
        </div>
    )
}

export default EditorSidebar
