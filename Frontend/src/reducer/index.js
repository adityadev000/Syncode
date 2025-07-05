import {combineReducers} from "@reduxjs/toolkit" ; 
import authReducer from '../slices/authSlice' ; 
import userReducer from '../slices/userSlice' ; 
import projectReducer from '../slices/projectSlice' ; 

const rootReducer = combineReducers({
    auth : authReducer ,
    user : userReducer ,
    project : projectReducer , 
    
})

export default rootReducer ; 