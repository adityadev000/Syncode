import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import Operations from './Operations'
import { getProjectDetails } from '../../services/operarions/projectApis';
import { useDispatch, useSelector } from 'react-redux';
import {setProject, setProjectLoading} from '../../slices/projectSlice'


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
                
                const rootFolders = result.folders.length > 0 ?  result?.folders(item => item.parentFolderDirectory === 'root/') : null  ; 
                const rootFiles = result.folders.length > 0 ? result?.files(item => item.parentFolderDirectory === 'root/') : null  ; 

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
        navigate(`/project/${projectId}/${folderId}${file._id}`) ; 
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
                <Operations file={true} folder={true} deletee={false} path="root" name={project.name} project={project} type='project'/>

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
    return (
        <div>
            {
                node.type === 'Folder' ?(
                    <>
                        <div onClick={() => {
                            if(open){
                                navigate(`/project/${projectId}`) ; 
                                setOpen(false) ; 
                            }
                            else{
                                navigate(`/project/${projectId}/${node._id}`) ; 
                                setOpen(true) ; 
                            }

                        } } >
                            {node.name}
                            <Operations/>
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
                    </>
                ) : (
                    <div onClick={() => onFileClick(node)}>
                        {node.name}
                        <Operations/>
                    </div>
                )
            }
        </div>
    )
}

export default EditorSidebar
