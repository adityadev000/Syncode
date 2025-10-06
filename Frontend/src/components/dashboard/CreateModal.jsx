import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createFile, createFolder, renameFileName, renameFolderName, renameProjectName } from "../../services/operarions/projectApis";
import { setProjectLoading } from "../../slices/projectSlice";

const CreateModal = ({modalData , setModalData}) => {
    const { register, handleSubmit, reset , formState: { errors, isSubmitting } } = useForm();
    const {token} = useSelector((state) => state.auth) ; 
    const {folderId , projectId , fileId } = useParams() ; 
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 


    const onSubmit = async(data ) => {

        console.log("modal data " ,modalData) ; 

        if(modalData.opr === "rename"){

            const res = {
                name : data.name , 
                projectId
            }
            if(modalData.type === "Project"){
                //project rename pending 
                await renameProjectName(res ,token) ; 
            }
            else if (modalData.type === "Folder"){
                const res = {
                    name : data.name , 
                    folderId,
                }
                await renameFolderName(res  ,token) ; 
            }
            else{
                //file rename 
                const res = {
                    name : data.name , 
                    fileId,
                }
                await renameFileName(res  ,token) ;
            }
        }
        else if(modalData.opr === "folder"){

            const res = {
                    name  : data.name , 
                    path : modalData.path , 
                    projectId : projectId , 
                }
            console.log("res = " , res ) ; 
            const result = await createFolder(res , token ) ; 
        }
        else{
            // create file
            const res = {
                name  : data.name , 
                path : modalData.path , 
                projectId : projectId , 
            }
            console.log("res = " , res ) ; 
            const result = await createFile(res , token ) ;
            if(result.parentFolder === null) {
                navigate(`/project/${projectId}/file/${result._id}`)
            }
            navigate(`/project/${projectId}/folder/${folderId}/file/${result._id}`) ;
            
        }
        //this is flag for the project has been updated. 
        dispatch(setProjectLoading(true) );
        setModalData(null) ;
    }

    useEffect(() => {
        reset({
            name: modalData?.defaultValue || ""  
        });
    }, [modalData, reset]);

    if (!modalData) return (<div>No Data to display </div>);
    return (   
        <div className=' font-bold text-white w-screen h-screen flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm z-50 '>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-gray-900 shadow-lg p-8 rounded-lg w-full max-w-lg space-y-6 border-richblack-400 flex gap-5 flex-col z-50"
            >
                <h2 className="text-2xl font-semibold text-center text-blue-400">{modalData.text}</h2>

                {/* Project Name */}
                <div>
                    <label className="block mb-1 text-sm"></label>
                    <input
                        {...register("name", { required: "Project name is required" })}
                        type="text"
                        placeholder={`Enter ${modalData.opr} Name`}
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
                    {isSubmitting ? "loading..." : `${modalData.btn1Text}`}
                </button>
                <button onClick={ modalData.btn2Handler } className='w-full bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded font-medium text-white'>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default CreateModal