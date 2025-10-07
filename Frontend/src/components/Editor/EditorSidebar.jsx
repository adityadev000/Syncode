import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import Operations from './Operations'
import { getProjectDetails } from '../../services/operarions/projectApis';
import { useDispatch, useSelector } from 'react-redux';
import {setProject, setProjectLoading} from '../../slices/projectSlice'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import {setActiveObject} from '../../slices/editorSlice' ; 
import { getFileIcon } from '../../data/fileIconsProvider';
import { FaFolder } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { VscProject } from 'react-icons/vsc';

const EditorSidebar = ({socket}) => {

    const {projectId } = useParams() ; 
    const {project , projectLoading} = useSelector((state) => state.project) ; 
    const {token} = useSelector((state) => state.auth ) ; 
    const {user} = useSelector((state) => state.user ) ; 
    const [rootF , setRoot] = useState(null ); 
    const[loading , setLoading] = useState(true) ; 
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const [permission , setpermission] = useState(true) ; 
    
    

    const projectSyncHandler =(payload) => {

        const {updatedProject} = payload ; 

        toast.success("project updated ") ; 

        dispatch(setProject(updatedProject)) ; 


        let rootFolders = updatedProject?.folders.length > 0 ?  updatedProject?.folders.filter(item => item?.parentFolderDirectory === 'root') : null  ; 
        let rootFiles = updatedProject?.files.length > 0 ? updatedProject?.files.filter(item => item?.parentFolderDirectory === 'root') : null  ; 

        setRoot({ rootFolders , rootFiles  }) ;
    }

    useEffect(() => {
        if(projectLoading){
            // project is updated. 
            const emitData = {
                projectId : projectId , 
            }
            socket.emit('project_updated' , emitData ) ; 

            dispatch(setProjectLoading(false)) ; 
        }

        socket.on('project-updated-details' , projectSyncHandler ) ; 

        async function fetchProjectDetails() {
            setLoading(true) ; 
            const result = await getProjectDetails(projectId , token ) ; 

            if(result){
                dispatch(setProject(result)) 

                
                const rootFolders = result?.folders.length > 0 ?  result?.folders.filter(item => item?.parentFolderDirectory === 'root') : null  ; 
                const rootFiles = result?.files.length > 0 ? result?.files.filter(item => item?.parentFolderDirectory === 'root') : null  ; 



                setRoot({ rootFolders , rootFiles  }) ;

            }

            dispatch(setProjectLoading(false)) ; 
            setLoading(false) ; 
        }
        
        fetchProjectDetails() ; 

    },[projectId , projectLoading] ) ; 

    const onFileClick = (file) => {
        if(file.parentFolderDirectory === "root") {
            navigate(`/project/${projectId}/file/${file._id}`)
        }
        else{
            navigate(`/project/${projectId}/folder/${file.parentFolder}/file/${file._id}`) ; 
        } 
        dispatch(setActiveObject(file)) ; 
    }
    useEffect(() => {
        project?.members?.map((users) => {
            if(users.admin === user._id){
                setpermission(true) ; 
            }
            else if(users.user === user._id) {
                if(users.permission === 'read'){
                    setpermission(false) ; 
                }
                else{
                    setpermission(true) ; 
                }
            }
        })
    } , [user] ) ; 
    if(loading){
        return (
            <div>Loading...</div>
        )

    }
    if(!project  ){
        return (
            <div>no file found</div>
        )
    }
    return (
        <div className=' overflow-y-auto text-lg'>
            <div className='flex gap-2 '>

                <div className='group flex gap-2 items-center'>

                    <VscProject />
                    <div className=' uppercase cursor-pointer group'>{project.name}</div>
                    
                    <div className={`opacity-0 ${permission ? 'group-hover:opacity-100' : 'opacity-0'} `}>
                        <Operations file={true} folder={true} deletee={false} path="root" name={project.name} project={project} type='Project'/>
                    </div>
                </div>

            </div>

            <div className=''>
                {
                    rootF?.rootFolders &&
                    [...rootF?.rootFolders]
                        .sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
                        <div key={item._id}>
                            <div>
                                <FolderView node={item} onFileClick = {onFileClick} />
                            </div> 
                        </div>
                    ))
                }
                {
                    rootF?.rootFiles &&
                    [...rootF?.rootFiles]
                        .sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
                        <div key={item._id}>
                            <FolderView node={item} onFileClick = {onFileClick} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

const FolderView = ({node, onFileClick}) => {
    const [open , setOpen] = useState(true) ;  
    const navigate = useNavigate() ; 
    const {projectId , fileId} = useParams() ; 
    const {project } = useSelector((state) => state.project) ; 
    const {user } = useSelector((state) => state.user) ; 
    const [permission , setpermission] = useState(true) ; 
    useEffect(() => {
            project?.members?.map((users) => {
                if(users.admin === user._id){
                    setpermission(true) ; 
                }
                else if(users.user === user._id) {
                    if(users.permission === 'read'){
                        setpermission(false) ; 
                    }
                    else{
                        setpermission(true) ; 
                    }
                }
            })
        } , [user] ) ; 
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
                                <div className='cursor-pointer flex  items-center gap-2'>
                                    {<FaFolder />}
                                    {node.name}
                                </div>
                            </div>
                            <div className={`opacity-0 ${permission ? 'group-hover:opacity-100' : 'opacity-0'}   `}onClick={() => {if(!open) {setOpen(true) ;  navigate(`/project/${projectId}/folder/${node._id}`) ; } }} >
                                <Operations file={true} folder={true} deletee={true} path={node.path} name={node.name} project={project} type='Folder' />
                            </div>
                        </div>
                        {open && (
                                <div>
                                    {
                                        node?.folders &&
                                        [...node.folders]
                                            .sort((a, b) => a.name.localeCompare(b.name)).map((child) => (
                                            <FolderView key={child._id} node={child} onFileClick={onFileClick}/>
                                        ))
                                    }
                                    {
                                        node?.files &&
                                        [...node.files]
                                            .sort((a, b) => a.name.localeCompare(b.name)).map((child) => (
                                            <FolderView key={child._id} node= {child} onFileClick={onFileClick}/>
                                        ))
                                    }
                                </div>
                        )}
                    </div>
                ) : (
                        <div onClick={() => onFileClick(node)} className={`group flex items-center gap-2 pl-3 cursor-pointer `}>
                            {getFileIcon(node.name)}
                            <p className={`${fileId === node._id  ? 'text-blue-100' : 'text-white' }`}>
                                {node.name}
                            </p>
                            <div className={`opacity-0 ${permission ? 'group-hover:opacity-100 ' : 'opacity-0'}`}>
                                <Operations file={false} folder={false}  deletee={true} path={node.path} name={node.name} project={project} type='File' />
                            </div>
                        </div>
                )
            }
        </div>
    )
}

export default EditorSidebar
