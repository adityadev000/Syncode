import React, { useState } from 'react'
import toast from 'react-hot-toast';


const ProfileField = ({ label, value }) => {

    const [isEditable, setIsEditable] = useState(false);
    const [val, setValue] = useState(value);

    const onEdit = async() => {
        if(!isEditable){
            setIsEditable(true) ; 
            return ; 
        }
        else{
            if(val === value ){
                toast.error(`${label} is not changed`) ; 
                return ; 
            }
            toast.success("API call") ; 
            setIsEditable(false)
        }
        //api call 
    }
    return( 
    <div className="mb-4  flex justify-between items-center border-b border-gray-700 pb-2">
        <div className='w-[90%] '>
            <p className="text-sm text-gray-400">{label}</p>
            <input
                type="text"
                value={val}
                onChange={(e) => setValue(e.target.value)}
                readOnly={!isEditable}
                className={` w-full  bg-transparent p-2 rounded ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
            />
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
    )
};

export default ProfileField;