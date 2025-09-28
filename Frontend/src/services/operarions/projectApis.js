import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {  project } from "../apis";


export async function getProjectDetails(projectId , token) {
    console.log("project Id " , projectId)
    let result = null ; 

    try{
        const response = await apiConnector("POST" , project.GET_PROJECT_DETAILS_API , {projectId : projectId} , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.project ; 
        console.log("PROJECT  RESPONSE..." , response.data.project) ; 

    }
    catch(err){
        console.error(err) ; 
    }

    return result ; 
}

export async function getFileContent(fileId , token) {

    let result = null ; 

    try{
        const response = await apiConnector("POST" , project.GET_FILE_CONTENT_API , {fileId : fileId} , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.file ; 
        console.log("FILE  RESPONSE..." , response) ; 

    }
    catch(err){
        console.error(err) ; 
    }

    return result ; 
}

export async function createProject(data , token) {

    let result = null ; 
    const tid = toast.loading("Creating Project...") ; 

    try{
        const response = await apiConnector("POST" , project.CREATE_PROJECT_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.project ; 
        console.log("PROJECT  RESPONSE..." , response) ; 
        toast.success("Project Created Successfully") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("Project Creation Failed") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}


export async function renameProjectName(data  ,  token) {

    let result = null ; 
    const tid = toast.loading("Loading...") ; 

    try{
        const response = await apiConnector("POST" , project.RENAME_PROJECT_NAME_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data ; 
        console.log("PROJECT  RESPONSE..." , response) ; 
        toast.success("Project Renamed Successfully") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("Project can not be Renamed") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}


export async function renameFileName(data  ,  token) {

    let result = null ; 
    const tid = toast.loading("Loading...") ; 

    try{
        const response = await apiConnector("POST" , project.RENAME_FILE_NAME_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data ; 
        console.log("PROJECT  RESPONSE..." , response) ; 
        toast.success("file Renamed Successfully") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("file can not be Renamed") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}


export async function renameFolderName(data  ,  token) {

    let result = null ; 
    const tid = toast.loading("Loading...") ; 

    try{
        const response = await apiConnector("POST" , project.RENAME_FOLDER_NAME_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data ; 
        console.log("PROJECT  RESPONSE..." , response) ; 
        toast.success("folder Renamed Successfully") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("folder can not be Renamed") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}


export async function createFolder(data  ,  token) {

    let result = null ; 
    const tid = toast.loading("Creating Folder...") ; 

    try{
        const response = await apiConnector("POST" , project.CREATE_FOLDER_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.folder; 
        console.log("Folder  RESPONSE..." , response) ; 
        toast.success("folder Created") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("folder can not be Created") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}


export async function createFile(data  ,  token) {

    let result = null ; 
    const tid = toast.loading("Creating file...") ; 

    try{
        const response = await apiConnector("POST" , project.CREATE_FILE_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data.file; 
        console.log("FILE  RESPONSE..." , response) ; 
        toast.success("file Created") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("file can not be Created") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}


export async function deleteFile(data  ,  token) {

    let result = null ; 
    const tid = toast.loading("Deleting file...") ; 

    try{
        const response = await apiConnector("POST" , project.DELETE_FILE_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data; 
        console.log(" DLETE FILE  RESPONSE..." , response) ; 
        toast.success("file Deleted") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("file can not be Deleted") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}


export async function deleteFolder(data  ,  token) {

    let result = null ; 
    const tid = toast.loading("Deleting folder...") ; 

    try{
        const response = await apiConnector("POST" , project.DELETE_FOLDER_API , data , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data; 
        console.log(" DLETE FOLDER  RESPONSE..." , response) ; 
        toast.success("folder Deleted") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("folder can not be Deleted") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}

export async function saveFileData(fileId , code ,  token) {

    let result = null ; 
    const tid = toast.loading("Saving file...") ; 

    try{
        const response = await apiConnector("POST" , project.SAVE_FILE_API , {fileId , code} , { 
            Authorization: `Bearer ${token}` ,
        } ) ;

        if(!response.data.success){
            throw new Error(response.data.message ) ; 
        }

        result = response.data; 
        console.log(" Savae FILE  RESPONSE..." , response) ; 
        toast.success("File Saved") ; 

    }
    catch(err){
        console.error(err) ; 
        toast.error("File can not be Saved") ; 
    }
    toast.dismiss(tid) ;
    return result ; 
}