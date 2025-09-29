import {combineReducers} from "@reduxjs/toolkit" ; 
import authReducer from '../slices/authSlice' ; 
import userReducer from '../slices/userSlice' ; 
import projectReducer from '../slices/projectSlice' ; 
import editorReducer from '../slices/editorSlice' ; 

const rootReducer = combineReducers({
    auth : authReducer ,
    user : userReducer ,
    project : projectReducer ,
    editor : editorReducer , 
    
})

export default rootReducer ; 