import React, { useRef, useState } from 'react'
import ProfileField from './ProfileField';
import ProfileGender from './ProfileGender';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFileUpload } from 'react-icons/md';
import { setUser } from '../../slices/userSlice';
import toast from "react-hot-toast";
import { changeAvtar } from '../../services/operarions/profileApis';

const MyProfile = () => {


    const dispatch = useDispatch() ; 
    const {token} = useSelector((state) => state.auth) ; 
    const {user} = useSelector((state) => state.user) ; 
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null) ;
    const [files, setFiles] = useState(null);
    const[loading ,setLoading] = useState(false) ; 
    const [update , setUpdate ] = useState(false) ; 
    const [isEditable, setIsEditable] = useState(false);

    function clickhandler() {
        fileInputRef.current.click() ; 
    }
    function fileHandler(event){
        const files = event.target.files[0] ; 

            if (files && files.type.startsWith('image/')) {
                const imageURL = URL.createObjectURL(files);
                setPreviewImage(imageURL);

                setFiles(files) ; 
            }
    }
    const uploadHandler = async() => {
        if(loading){
            return ; 
        }
        if(!files){
            toast.error("please upload a new image to change") ;
            return ; 
        }
        setLoading(true) ; 

        const formData = new FormData() ;
        formData.append("avtar" , files) ;

        const result = await changeAvtar(formData , token ) ; 
        
        if(result !== null ){
            setUpdate(true) ;
            setFiles(null) ;
        }
        setLoading(false) ; 
    }


    return (
        <div className="min-h-screen bg-gray-950 text-white  flex justify-center">
            <div className="bg-gray-900  rounded-xl w-full max-w-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

                <div className="flex flex-col gap-4 items-center justify-center mb-6">
                    <div>
                        {
                            previewImage=== null ? 
                            (
                                <img
                                    src={user.avtarUrl} 
                                    alt='Preview'
                                    loading='lazy'
                                    className=' aspect-square w-20 rounded-full'
                                />
                            ) : (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    loading='lazy'
                                    className=' aspect-square w-20 rounded-full'
                                />
                            )
                        }
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <div className=' flex sm:flex-row flex-col gap-5 '>
                            <button
                                className=' bg-richblack-600  h-fit px-5 py-2 rounded-md  text-richblack-25 text-[1rem] font-semibold'
                                onClick={clickhandler}
                            >
                                Select 
                            </button>
                            <input
                                type='file'
                                accept='image/*'
                                ref={fileInputRef}
                                onChange={fileHandler}
                                className='hidden'
                            />
                            
                            <button 
                                type='submit'
                                onClick={uploadHandler}
                                className="flex gap-2 items-center justify-center bg-blue-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold"
                            >
                                <MdOutlineFileUpload />
                                Upload
                            </button>
                        </div>
                    </div>
                </div>

                <ProfileField label="First Name" value={user.firstName} />
                <ProfileField label="Last Name" value={user.lastName}  />
                <ProfileField label="Username" value={user.userName}  />
                <ProfileField label="Email" value={user.email}  />
                <ProfileField label="Bio" value={user.bio}  />
                <ProfileGender value={user.gender} />
            </div>
        </div>
    );
}
export default MyProfile
