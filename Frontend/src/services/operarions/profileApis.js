
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profile } from "../apis";


export async function changeAvtar(formData , token) {

    let result = null ; 
    
    const tid = toast.loading("Uploading image...") ; 

    try{
        const response = await apiConnector("POST" , profile.CHANGE_AVTAR_API , formData , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data ; 
        console.log("PROFILE PIC RESPONSE..." , response) ; 
        toast.success("Profile picture changed") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ; 
    }

    toast.dismiss(tid) ; 
    return result ; 
}

export async function updateProfile(data , token) {

    let result = null ; 
    
    const tid = toast.loading("Loading...") ; 

    try{
        const response = await apiConnector("POST" , profile.UPDATE_PROFILE_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data ; 
        console.log("PROFILE  RESPONSE..." , response) ; 
        toast.success("Profile updated") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ; 
    }

    toast.dismiss(tid) ; 
    return result ; 
}


export async function getUserDetail(token) {
    
    let result = null ; 
    
    try{
        const response = await apiConnector("POST" , profile.GET_USER_DETAILS_API , null , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        console.log("updated user  RESPONSE..." , response) ; 
        result = response.data.user ; 

    }
    catch(err){
        console.error(err) ; 
    }

    return result ; 
}

