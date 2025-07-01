import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { updateProfile } from '../../services/operarions/profileApis';
import { useSelector } from 'react-redux';


const ProfileField = ({ label, value ,setUpdate , name}) => {

    const [isEditable, setIsEditable] = useState(false);
    const [val, setValue] = useState(value);

    const {token} = useSelector((state) => state.auth) ; 

    const onEdit = async() => {
        if(!isEditable){
            setIsEditable(true) ; 
            return ; 
        }
        else{
            if(val === value ){
                toast.error(`${label} is not changed`) ; 
                setIsEditable(false) ; 
                return ; 
            }
            setIsEditable(false) ; 
            const result = await updateProfile({[name] : val } , token) ; 

            if(result != null ){
                setUpdate(true) ; 
            }
        }
    }
    return( 
    <div className="mb-4  flex justify-between items-center border-b border-gray-700 pb-2">
        <div className='w-[90%] '>
            <p className="text-sm text-gray-400">{label}</p>
            
            <input
                type="text"
                value={val}
                onChange={(e) => setValue(e.target.value)}
                readOnly={label === 'Email' ? true : !isEditable }
                className={` w-full bg-transparent p-2 rounded`}
            />
        </div>
        {
            label === "Email" ? (<div></div>) : 
            (
                <button
                    onClick={onEdit}
                    className="text-blue-500 hover:underline text-sm font-medium"
                >
                    {
                        isEditable ? 'Save' : 'Edit'
                    }
                </button>
            )
        }
    </div>
    )
};

export default ProfileField;