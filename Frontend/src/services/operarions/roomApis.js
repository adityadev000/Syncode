import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { room } from "../apis";

export async function createRoom(projectId , token , permission ) {
    let result = null ; 

    try{
        const response = await apiConnector("POST" , room.CREATE_ROOM_API, {projectId , permission} , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.data ; 
        console.log("PROJECT  RESPONSE..." , response.data.data) ; 

    }
    catch(err){
        console.error(err) ; 
    }

    return result ; 
}


export async function joinByRoomId(token , projectId , password) {

    let result = null ; 
    const tid = toast.loading("Joining...") ; 

    try{
        const response = await apiConnector("POST" , room.JOIN_ROOM_API, {projectId , password } , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        console.log(" JOIN BY ROOM ..." , response) ; 
        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data; 
        toast.success(result.message) ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}