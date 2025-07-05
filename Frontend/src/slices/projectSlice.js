import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    project : null , 
    projectLoading : false , 
}

const ProjectSlice = createSlice({
    name : "project" , 
    initialState : initialState , 
    reducers : {
        setProject(state , action ){
            state.project = action.payload; 
        } ,
        setProjectLoading(state, action ){
            state.projectLoading = action.payload ; 
        }
    }
})

export const {setProject , setProjectLoading} = ProjectSlice.actions; 
export default ProjectSlice.reducer ;  