import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project , admin}) => {
    const navigate = useNavigate() ;

    const openProject = ()=> {
        navigate(`/project/${project._id}`)
    }
    return (
        <div onClick={openProject} className="bg-gray-800 rounded-lg p-5 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-blue-400">{project.name}</h2>
            <p className="text-gray-300 mt-2">{project.description}</p>
            {
                admin && <p>`Admin : ${admin.firstName} ${admin.lastName}`</p>
            }
        </div>

    );
};

export default ProjectCard;
