import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjectDetails } from '../../services/operarions/projectApis';
import { setProject } from '../../slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/Spinner';

const ProjectCard = ({ project , admin}) => {
    const navigate = useNavigate() ; 
    const {token} = useSelector((state) => state.auth) ; 
    const dispatch = useDispatch() ; 
    const [loading , setLoading] = useState(false) ; 

    const openProject = async()=> {
        setLoading(true) ; 
        const result = await getProjectDetails(project._id , token ) ; 
        if(result){
            dispatch(setProject(result))  ; 

            setLoading(false) ; 
            navigate(`/project/${project._id}`) ; 
        }
        setLoading(false) ; 

    }

    if(loading){
        {
            console.log("data loading") ; 
        }
        return(<Spinner/>) 
    }
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 flex flex-col gap-3 hover:-translate-y-1">
        
        {/* Project Name */}
            <h2 className="text-2xl font-semibold text-cyan-400 tracking-wide">
                {project.name}
            </h2>

        {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
                {project.description || "No description provided."}
            </p>

        {/* Admin Info */}
        {admin && (
            <p className="text-gray-400 text-sm">
            <span className="font-medium text-gray-200">Admin:</span>{" "}
            {admin.firstName} {admin.lastName}
            </p>
        )}

        {/* Stats Section */}
        <div className="flex justify-between items-center text-sm mt-2 text-gray-300">
            <p>
            👥 <span className="font-medium">Members:</span>{" "}
            {project?.members?.length + 1}
            </p>
            <p>
            🟢 <span className="font-medium">Active:</span>{" "}
            {project?.activeUsers?.length || 0}
            </p>
        </div>

        {/* Join Button */}
        <button
            type="button"
            onClick={openProject}
            className="mt-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 
                    hover:from-cyan-400 hover:to-indigo-400 
                    text-white font-semibold rounded-xl text-sm px-6 py-2.5 
                    shadow-md hover:shadow-cyan-500/30 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
        >
            Join Project 🚀
        </button>
        </div>


    );
};

export default ProjectCard;
