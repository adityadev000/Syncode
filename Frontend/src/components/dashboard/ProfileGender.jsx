import { useState } from "react";
import toast from "react-hot-toast";

const ProfileGender = ({ value }) => {

    const [isEditable, setIsEditable] = useState(false);
    const [val, setValue] = useState(value);

    const onEdit = async() => {
        if(!isEditable){
            setIsEditable(true) ; 
            return ; 
        }
        else{
            if(val === value ){
                toast.error("gender is not changed") ; 
            }
            toast.success("API call") ; 
            setIsEditable(false)
        }
        //api call 
    }

    return (
        <div className="mb-4 flex justify-between items-center border-b border-gray-700 pb-2">
            <div>
                <p className="text-sm text-gray-400">Gender</p>
                {isEditable ? (
                    <select
                        value={val}
                        onChange={(e)=>{setValue(e.target.value)}}
                        className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Custom">Custom</option>
                    </select>
                ) : (
                    <p className="text-lg font-medium text-white">{value}</p>
                )}
            </div>

            <button
                onClick={onEdit}
                className="text-blue-500 hover:underline text-sm font-medium"
            >
                {
                    isEditable ? 'Save' : 'Edit'
                }
            </button>
        </div>
    );
};


export default ProfileGender