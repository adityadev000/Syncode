import {combineReducers} from "@reduxjs/toolkit" ; 
import authReducer from '../slices/authSlice' ; 
import userReducer from '../slices/userSlice' ; 
import projectReducer from '../slices/projectSlice' ; 
import editorReducer from '../slices/editorSlice' ; 
import hamburgerReducer from '../slices/hamburgerSlice' ; 

const rootReducer = combineReducers({
    auth : authReducer ,
    user : userReducer ,
    project : projectReducer ,
    editor : editorReducer , 
    hamburger : hamburgerReducer , 
    
})

export default rootReducer ; 