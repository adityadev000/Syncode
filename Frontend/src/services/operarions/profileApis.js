
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