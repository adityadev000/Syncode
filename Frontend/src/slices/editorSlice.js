import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    activeObject : null , 
    changedFiles : [] ,
    isfileSynced : false , 
}

const EditorSlice = createSlice({
    name : 'editor' , 
    initialState , 
    reducers : {
        setActiveObject(state , action ){
            state.activeObject = action.payload ; 
        },
        unsetActiveObject(state){
            state.activeObject = null;
        },
        trackFileChange(state ,action ){
            const {item , content , projectId} = action.payload ; 
            const val = state.changedFiles.filter(e => e.fileId !== item._id ) ; 
                {if(item.content!==content)
                    val.push({
                    fileId:item._id,
                    projectId,
                    content,
                });
            }   
            state.changedFiles = val;
        },
        resetChangedFiles(state ) {
            state.changedFiles = [] ; 
        },
        setIsFileSynced(state,action){
            state.isfileSynced = action.payload;
        },
    }
})

export const {setActiveObject,
unsetActiveObject,
trackFileChange,
setIsFileSynced,resetChangedFiles} = EditorSlice.actions; 
export default EditorSlice.reducer ;  