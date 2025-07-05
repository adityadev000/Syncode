import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CreateModal = ({modalData , setModalData}) => {
    const { register, handleSubmit, reset , formState: { errors, isSubmitting } } = useForm();
    const {token} = useSelector((state) => state.auth) ; 
    const {folderId , projectId , fileId } = useParams() ; 


    const onSubmit = async() => {
        if(modalData.type === 'File') {
            toast.success("file created")
        }
        else if(modalData.type === 'Folder'){
            toast.success("folder created")
            
        }
        else{
            toast.success("file Renamed")
        }
        setModalData(null) ;
    }

    useEffect(() => {
        reset({
            name: modalData?.defaultValue || ""  
        });
    }, [modalData, reset]);

    if (!modalData) return null;
    return (   
        <div className=' font-bold text-white w-[calc(100vw-1rem)] h-[calc(100vh-3.5rem)]  flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm z-40 '>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-gray-900 shadow-lg p-8 rounded-lg w-full max-w-xl space-y-6 border-richblack-400 flex gap-5 flex-col"
            >
                <h2 className="text-2xl font-semibold text-center text-blue-400">{modalData.text}</h2>

                {/* Project Name */}
                <div>
                    <label className="block mb-1 text-sm"></label>
                    <input
                        {...register("name", { required: "Project name is required" })}
                        type="text"
                        placeholder={`Enter ${modalData.type} Name`}
                        className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white"
                >
                    {isSubmitting ? "Creating..." : `${modalData.btn1Text}`}
                </button>
                <button onClick={ modalData.btn2Handler } className='w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white'>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default CreateModal