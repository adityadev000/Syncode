import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {createRoom} from '../../services/operarions/roomApis' 
import toast from 'react-hot-toast';

const InviteForm = ({setBtn}) => {
    const { register, handleSubmit,watch , formState: { errors, isSubmitting } } = useForm();
    const {token} = useSelector((state) => state.auth) ; 
    const {user} = useSelector((state) =>state.user) ; 
    const {project} = useSelector((state) => state.project) ; 

    
    const onSubmit = async (data) => {

        if(user._id === project.admin ){

        const response = await createRoom(project._id , token , data.permission ) ; 

        const message = `🔑 Use the following credentials to collaborate:\n\nRoom ID: ${response.projectId}\nPassword: ${response.password}\n\n⚠️ Reminder: This will be valid only for 5 minutes.`

        navigator.clipboard.writeText(message)
        .then(() => {
            toast.success("RoomId and PassWord copied") ; 
        })

        .catch(()=>{
            toast.error("failed to copy roomId and Password") ; 
        })

        setBtn(false) ; 

        }   
        else{
            toast.error("conatct your admin to invite someone ")
        }
    };
    const selected = watch("permission");
    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 
        w-screen h-[calc(100vh-3.5rem)]  fixed top-0 left-0 backdrop-blur-lg z-40
        ">
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="bg-gray-900 shadow-lg p-8 rounded-lg w-full max-w-xl space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center text-blue-400">Share Room Access — Set Permissions (Read-Only / Read & Write)</h2>

            {/* Project Name */}
            <div className="flex gap-4 justify-center">
        {/* ReadOnly option */}
            <label
            className={`cursor-pointer px-6 py-3 rounded-lg border text-sm font-medium transition ${
                selected === "readOnly"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
            >
            <input
                type="radio"
                value="readOnly"
                {...register("permission", { required: "Please select a permission" })}
                className="hidden"
            />
                Read Only
            </label>

        {/* Read & Write option */}
            <label
            className={`cursor-pointer px-6 py-3 rounded-lg border text-sm font-medium transition ${
                selected === "readWrite"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
            >
            <input
                type="radio"
                value="readWrite"
                {...register("permission", { required: "Please select a permission" })}
                className="hidden"
            />
            Read & Write
            </label>
        </div>
        {errors.permission && (
            <p className="text-red-500 text-sm mt-2 text-center">
            {errors.permission.message}
            </p>
        )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white"
            >
                {isSubmitting ? "Inviting..." : "Invite"}
            </button>
            <button onClick={() => setBtn(false) } className='w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white'>
                Cancel
            </button>
        </form>
        </div>
    );
};

export default InviteForm;

