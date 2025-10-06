import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../services/operarions/profileApis';
import Spinner from '../common/Spinner';
import ProjectCard from './ProjectCard';

const ProjectCollab = () => {
    const {token} = useSelector((state) => state.auth) ; 
    const {user} = useSelector((state) => state.user) ; 
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
        <div className="h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 md:px-12 transition-all duration-300">
        {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-3xl font-semibold text-gray-200 mb-3">
                    No Projects Yet 🚧
                </h2>
                <p className="text-gray-400 text-sm max-w-md">
                    Looks like you haven’t collaborated any projects yet. Start one now and
                    collaborate with others in real-time!
                </p>
            </div>
        ) : (
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
            {/* Header Section */}
            <div className="text-center md:text-left space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
                Welcome back, {user?.firstName}! 👋
                </h1>
                <p className="text-gray-300 text-base">
                Ready to start coding together? Here are your active projects:
                </p>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {
                    projects.map(project => (
                        <ProjectCard  key={project._id} project={project} admin={project.admin}/>
                    ))
                }
            </div>
            </div>
        )}
        </div>
    )
}

export default ProjectCollab
