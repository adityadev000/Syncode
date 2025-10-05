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
        <div onClick={openProject} className="bg-gray-800 rounded-lg p-5 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-blue-400">{project.name}</h2>
            <p className="text-gray-300 mt-2">{project.description}</p>
            {
                admin && <p>Admin : {admin.firstName} {admin.lastName}</p>
            }
        </div>

    );
};

export default ProjectCard;
