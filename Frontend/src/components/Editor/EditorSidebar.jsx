import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import Operations from './Operations'
import { getProjectDetails } from '../../services/operarions/projectApis';
import { useDispatch, useSelector } from 'react-redux';
import {setProject, setProjectLoading} from '../../slices/projectSlice'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';


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
                
                const rootFolders = result?.folders.length > 0 ?  result?.folders.filter(item => item.parentFolderDirectory === 'root') : null  ; 
                const rootFiles = result?.files.length > 0 ? result?.files.filter(item => item.parentFolderDirectory === 'root') : null  ; 

                const data = {
                    rootFolders , 
                    rootFiles , 
                }

                setRoot(data) ; 

            }

            dispatch(setProjectLoading(false)) ; 
            setLoading(false) ; 
        }

        fetchProjectDetails() ; 

    },[projectId , projectLoading] ) ; 

    const onFileClick = (file) => {
        if(file.parentFolder === null) {
            navigate(`/project/${projectId}/root/${file._id}`)
        }
        navigate(`/project/${projectId}/${folderId}/${file._id}`) ; 
    }

    if(project == null || loading === true ){
        return (
            <div>no file found</div>
        )
    }
    return (
        <div>
            <div className='flex gap-2 '>

                <div className=' uppercase'>{project.name}</div>
                <Operations file={true} folder={true} deletee={false} path="root" name={project.name} project={project} type='Project'/>

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
    const [open , setOpen] = useState(false) ;  
    const navigate = useNavigate() ; 
    const {projectId } = useParams() ; 
    const {project } = useSelector((state) => state.project) ; 
    return (
        <div className=' pl-2'>
            {
                node.type === 'Folder' ?(
                    <div>

                        <div className='flex gap-2 items-center'>
                            <div className='flex gap-2 items-center' onClick={() => {
                                if(open){
                                    setOpen(false) ; 
                                    navigate(`/project/${projectId}`) ; 
                                }
                                else{
                                    setOpen(true) ; 
                                    navigate(`/project/${projectId}/${node._id}`) ; 
                                }
                            
                            } } >
                                <div className=' text-3xl -mr-3 '>
                                    {
                                        !open ? <IoMdArrowDropdown className='text-3xl'/> : <IoMdArrowDropup className='text-3xl' />
                                    }
                                </div>
                                <div>

                                    {node.name}
                                </div>
                            </div>
                            <div onClick={() => {if(!open) {setOpen(true) ;  navigate(`/project/${projectId}/${node._id}`) ; } }} >
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
                    <div onClick={() => onFileClick(node)} className=' flex items-center pl-6'>
                        {node.name}
                        <Operations file={false} folder={false}  deletee={true} path={node.path} name={node.name} project={project} type='File' />
                    </div>
                )
            }
        </div>
    )
}

export default EditorSidebar
