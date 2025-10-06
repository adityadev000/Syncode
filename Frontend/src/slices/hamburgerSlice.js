import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    dashBoardSideBar : true , 
    editorSideBar : true , 
    isEditorLoads : false , 
    isDashboardLoads : false , 
}

const HamburgerSlice = createSlice({
    name : 'hamburger' , 
    initialState : initialState , 
    reducers : {
        setDashBoardSideBar (state , action ){
            state.dashBoardSideBar = action.payload ; 
        } , 
        setEditorSideBar(state ,action ){
            state.editorSideBar = action.payload ; 
        } , 
        setIsEditorLoads(state ,action ){
            state.isEditorLoads = action.payload ; 
        },
        setIsDashboardLoads(state ,action ){
            state.isDashboardLoads = action.payload ; 
        }
    }
})

export const {setDashBoardSideBar ,setEditorSideBar ,setIsEditorLoads,setIsDashboardLoads } =HamburgerSlice.actions ; 

export default HamburgerSlice.reducer ; 