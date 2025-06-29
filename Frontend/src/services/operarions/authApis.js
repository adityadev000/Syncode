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
        console.log("LOGIN RESPONSE..." , response) ; 
        toast.success("Logged in successfully") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ; 
    }

    toast.dismiss(tid) ; 
    return result ; 
}

export async function sendOtp(data) {
    let result = null ; 
    const tid = toast.loading("sending Otp...") ; 

    try{
        const response = await apiConnector("POST" , auth.SEND_OTP_API , data ) ; 

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.otp ; 
        console.log("OTP RESPONSE... ", response) ; 
        toast.success("Otp sent Succesfully") ;

    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}

export async function signup(data) {
    let result = null ;
    const tid = toast.loading("loading...") ; 

    try{
        const response = await apiConnector("POST" , auth.SIGNUP_API , data ) ; 
        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.user ; 
        console.log("SIGNUP RESPONSE... ", response) ; 
        toast.success(response.data.message) ;
    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ;
}

export async function resetPasswordToken(data) {
    let result = null ; 
    const tid = toast.loading("Loading...") ; 

    try{
        const response = await apiConnector("POST" , auth.RESET_PASSWORD_TOKEN_API , data ) ; 
        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.token ; 
        console.log("TOKEN RESPONSE... ", response) ; 
        toast.success(response.data.message) ;
    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ;
    }
    toast.dismiss(tid) ; 
    return result ;
}

export async function resetPassword(data) {
    let result = null ; 
    const tid = toast.loading("Loading...") ; 

    try{
        const response = await apiConnector("POST" , auth.RESET_PASSWORD_API , data ) ; 
        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data ; 
        console.log("RESET RESPONSE... ", response) ; 
        toast.success(response.data.message) ;
    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ;
    }
    toast.dismiss(tid) ; 
    return result ;
}