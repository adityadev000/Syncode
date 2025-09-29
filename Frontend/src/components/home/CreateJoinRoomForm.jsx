import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { joinByRoomId } from '../../services/operarions/projectApis';

const CreateJoinRoomForm = ({setJoinBtn}) => {

    const {register , handleSubmit , formState : {errors , isSubmitting } } = useForm() ;
    const {token} = useSelector((state) => state.auth) ; 
    const navigate = useNavigate() ; 

    const onSubmit = async(data) => {
        const result = await joinByRoomId(token ,data.roomId )  ; 
        
        if(result){
            navigate(`/project/${data.roomId}`) ; 
        }

    }

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 
        w-screen h-[calc(100vh-3.5rem)]  fixed top-0 left-0 backdrop-blur-lg z-40
        ">
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="bg-gray-900 shadow-lg p-8 rounded-lg w-full max-w-xl space-y-6"
        >
            <h2 className="text-2xl font-semibold text-center text-blue-400">Join with Room Id</h2>

            {/* room iD */}
            <div>
                <label className="block mb-1 text-sm">Room ID</label>
                <input
                    {...register("roomId", { required: "Room Id  is required" })}
                    type="text"
                    placeholder="Enter RoomId"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                {errors.roomId && <p className="text-red-400 text-sm mt-1">{errors.roomId.message}</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white"
            >
                {isSubmitting ? "Joining..." : "Join to Project"}
            </button>
            <button onClick={() => setJoinBtn(false) } className='w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white'>
                Cancel
            </button>
        </form>
        </div>
    );
}

export default CreateJoinRoomForm
