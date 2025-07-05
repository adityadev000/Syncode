import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/operarions/projectApis';
import { useSelector } from 'react-redux';

const CreateProjectForm = ({setBtn}) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const {token} = useSelector((state) => state.auth) ; 
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const result = await createProject(data , token ) ; 
        if(result){
            navigate(`/project/${result._id}`) ; 
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 
        w-screen h-[calc(100vh-3.5rem)]  fixed top-0 left-0 backdrop-blur-lg z-40
        ">
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="bg-gray-900 shadow-lg p-8 rounded-lg w-full max-w-xl space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center text-blue-400">Create New Project</h2>

            {/* Project Name */}
            <div>
                <label className="block mb-1 text-sm">Project Name</label>
                <input
                    {...register("name", { required: "Project name is required" })}
                    type="text"
                    placeholder="Enter project name"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block mb-1 text-sm">Description</label>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    placeholder="Short project description"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    rows="4"
                ></textarea>
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white"
            >
                {isSubmitting ? "Creating..." : "Create Project"}
            </button>
            <button onClick={() => setBtn(false) } className='w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white'>
                Cancel
            </button>
        </form>
        </div>
    );
};

export default CreateProjectForm;
