import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { auth } from "../apis";


export async function login(data) {

    let result = null ; 
    
    const tid = toast.loading("Logging in...") ; 

    try{
        const response = await apiConnector("POST" , auth.LOGIN_API , data ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.user ; 
        toast.success("Logged in successfully") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ; 
    }

    toast.dismiss(tid) ; 
    return result ; 
}