import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../services/operarions/profileApis';
import Spinner from '../common/Spinner';
import ProjectCard from './ProjectCard';

const ProjectCollab = () => {
    const {token} = useSelector((state) => state.auth) ; 
    const[projects , setProjects] = useState([]) ; 
    const [loading , setloading] = useState(false) ; 

    useEffect(() => {
        const fetchUserDetails = async() => {

            setloading(true) ; 

            const result = await getUserDetail(token) ; 

            if(result){
                setProjects(result.projectCollaborated) ; 
            }

            setloading(false) ; 
        }

        fetchUserDetails() ;
    } ,[] )

    if(loading){
        return(<Spinner/>)
    }
    return (
        <div>
            {
                projects.length === 0  ? (
                    <div>No project collaborated</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            projects.map(project => (
                                <ProjectCard  key={project._id} project={project} admin={project.admin}/>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ProjectCollab
